import React from 'react';
import './intro.css';
import { connect } from 'react-redux';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import {
  setTunnelLength,
  setTunnelLimitWeight,
  setShipWeights,
  validated,
} from '../../stores/globalField';
import CustomRegex from '../../lib/customRegex';

const inputDatas = props => [
  {
    ide: 'tunnel_length',
    title: '웜홀 길이',
    placeholder: '웜홀의 길이를 입력하세요.',
    inputType: 'number',
    onChangedHandler: e => {
      props.setTunnelLength(e.target.value);
    },
  },
  {
    ide: 'tunnel_limit_weight',
    title: '웜홀 하중',
    placeholder: '웜홀이 버틸 수 있는 총 무게를 설정하세요.',
    inputType: 'number',
    onChangedHandler: e => {
      props.setTunnelLimitWeight(e.target.value);
    },
  },

  {
    ide: 'ship_weights',
    title: '우주선 무게',
    placeholder: '웜홀을 건널 우주선들의 무게를 , 로 나누어 설정하세요.',
    inputType: 'string',
    onChangedHandler: e => {
      props.setShipWeights(e.target.value);
    },
  },
];

//입력값을 다음 페이지로 넘기기전 유효성을 검사한다.
//number의 경우 여기서는 양의 정수,
//array의 경우는 우주선들을 담는 배열으로 0이상의 최대 하중을 넘지 않는 수만 가능.
const validate = (type, value, compareValue) => {
  switch (type) {
    case 'number':
      if (CustomRegex.onlyPositiveInteger.test(value) && +value > 0) {
        return true;
      }
      return false;
    case 'array':
      if (CustomRegex.onlyPositiveIntegerStringArray.test(value)) {
        let weightsArr = value.split(',');
        weightsArr = weightsArr
          .map(weight => {
            return +weight;
          })
          .filter(weight => !weight || weight < 1 || weight > compareValue);
        if (weightsArr.length > 0) return false;
        return true;
      }
      return false;
    default:
      new Error('검증 실패. 어떤 case에도 일치되지 않음.');
  }
};

class Intro extends React.Component {
  //Submit 버튼 클릭시 유효성 검사 수행
  submitBtnHandler = e => {
    const {
      tunnel_length,
      tunnel_limit_weight,
      ship_weights,
      validated,
    } = this.props;
    if (!validate('number', tunnel_length) || tunnel_length > 10) {
      alert(
        '터널의 길이가 올바르지 않습니다. 1 ~ 10 사이의 양의 정수만 입력 해 주십시오.',
      );
      return;
    } else if (!validate('number', tunnel_limit_weight)) {
      alert(
        '터널의 하중이 올바르지 않습니다! 1 이상의 양의 정수만 입력 해 주십시오.',
      );
      return;
    } else if (!validate('array', ship_weights, tunnel_limit_weight)) {
      alert(
        '우주선 무게 입력이 올바르지 않습니다! , 로 정확하게 나누어 주십시오. 또한 우주선 무게는 웜홀 최대 허용 중량을 초과할 수 없으니 다시 한 번 확인 해 주십시오.',
      );
      return;
    }

    validated();
  };

  render() {
    return (
      <div className="introBackground">
        <div className="inputFieldWrapper">
          {inputDatas(this.props).map(input => {
            return <InputField {...input} />;
          })}
        </div>
        <SubmitButton clickHandler={this.submitBtnHandler} />
      </div>
    );
  }
}

export default connect(
  //mapStateToProps 함수에서 현재 유저가 값을 정확하게 입력하여 검증 되었는지 확인 한 후에 main 페이지로 넘어가게 한다.
  //ownProps는 현재 유저의 props 객체를 참조할 수 있도록 한다.

  ({ globalField }, ownProps) => {
    if (globalField.isValidated === true) {
      ownProps.history.push('/main');
    }

    return {
      tunnel_length: globalField.tunnel_length,
      tunnel_limit_weight: globalField.tunnel_limit_weight,
      ship_weights: globalField.ship_weights,
      isValidated: globalField.isValidated,
    };
  },
  { setTunnelLength, setTunnelLimitWeight, setShipWeights, validated },
)(Intro);
