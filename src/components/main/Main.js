import React from 'react';
import { connect } from 'react-redux';
import './main.css';
import DeckPanel from './DeckPanel';
import DashBoard from './DashBoard';
import Tunnel from './Tunnel';
import propTypes from 'prop-types';

class Main extends React.Component {
  /*
    startShip : 시작지점에서 대기중인 우주선들
    endShip : 웜홀을 통과해서 종료지점에서 대기중인 우주선들
    acrossShips : 웜홀을 통과중인 우주선들, 빈 칸이면 -1로 표현한다.
    time : 지난 시간 (sec)
    tunnel_current_weight : 현재 웜홀을 통과중인 우주선들의 무게합 
  */

  state = {
    startShips: [],
    endShips: [],
    acrossShips: [],
    time: 0,
    tunnel_current_weight: 0,
  };

  //반복해서 실행하는 함수
  looper = () => {
    //현재 웜홀이 비었는지 확인하는 함수
    const IsEmptyShipsOnTunnel = () => {
      let isEmpty = true;
      for (let i = 0; i < this.state.acrossShips.length; ++i) {
        if (this.state.acrossShips[i] !== -1) isEmpty = false;
      }

      return isEmpty;
    };

    let timer = setInterval(() => {
      this.shiftShipsInTunnel();
      this.takeoff();
      this.setState({ time: this.state.time + 1 });

      if (this.state.startShips.length === 0 && IsEmptyShipsOnTunnel()) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  //출발 대기지점 -> 웜홀로 우주선을 출발시키는 함수
  takeoff = () => {
    let { startShips, acrossShips } = this.state;

    let waitingShip = startShips[0];
    if (this.controlTakeoff(waitingShip)) {
      startShips = startShips.splice(1, startShips.length);
      acrossShips[0] = waitingShip;
      this.setState({ startShips: startShips, acrossShips: acrossShips });
    }
  };

  //웜홀 내의 우주선을 이동시키는 함수
  shiftShipsInTunnel = () => {
    let { acrossShips, endShips, tunnel_current_weight } = this.state;

    const lastShipOnTunnel = acrossShips[acrossShips.length - 1];
    if (lastShipOnTunnel !== -1) {
      endShips.push(lastShipOnTunnel);
      this.setState({
        endShips: endShips,
        tunnel_current_weight: tunnel_current_weight - lastShipOnTunnel,
      });
    }
    acrossShips = [-1].concat(acrossShips.splice(0, acrossShips.length - 1));
    this.setState({ acrossShips: acrossShips });
  };

  // 우주선이 출발해도 되는지 확인하는 함수 ( 다음 우주선이 출발하면 웜홀의 최대 중량을 넘지 않는지 확인 )
  controlTakeoff = shipWeight => {
    const { tunnel_current_weight } = this.state;
    const { tunnel_limit_weight } = this.props;
    const nextTunnelWeight = tunnel_current_weight + shipWeight;
    if (nextTunnelWeight <= tunnel_limit_weight) {
      this.setState({ tunnel_current_weight: nextTunnelWeight });
      return true;
    }
    return false;
  };

  componentDidMount() {
    const { history, isValidated, ship_weights, tunnel_length } = this.props;
    if (isValidated === false) {
      alert('잘못된 접근입니다.');
      history.push('/');
    } else if (isValidated === true) {
      history.go(history.length - 1);

      (async () => {
        let startShips = ship_weights.split(',');
        startShips = startShips.map(el => {
          return +el;
        });
        await this.setState({
          startShips: startShips,
          acrossShips: new Array(+tunnel_length).fill(-1),
        });

        this.looper();
      })();
    }
  }

  render() {
    const {
      startShips,
      endShips,
      acrossShips,
      time,
      tunnel_current_weight,
    } = this.state;
    const { tunnel_length, tunnel_limit_weight, ship_weights } = this.props;
    const globalInfoContent = [
      { key: '터널 길이', value: tunnel_length },
      { key: '터널 무게 제한', value: tunnel_limit_weight },
      { key: '우주선 무게', value: ship_weights },
    ];
    const currentInfoContent = [
      { key: '시간', value: time },
      { key: '현재 무게', value: tunnel_current_weight },
    ];

    return (
      <div className="mainComponent">
        <div className="start">
          <DeckPanel title="startPoint" shipsCount={startShips.length} />
        </div>
        <div className="center">
          <div className="upper">
            <DashBoard title="Global Info" content={globalInfoContent} />
          </div>
          <div className="middle">
            <Tunnel acrossShips={acrossShips} />
          </div>
          <div className="lower">
            <DashBoard title="Current Info" content={currentInfoContent} />
          </div>
        </div>
        <div className="end">
          <DeckPanel title="endPoint" shipsCount={endShips.length} />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  tunnel_length: propTypes.number,
  tunnel_limit_weight: propTypes.number,
  ship_weights: propTypes.string,
  isValidated: propTypes.bool,
};

export default connect(
  ({ globalField }) => ({
    tunnel_length: globalField.tunnel_length,
    tunnel_limit_weight: globalField.tunnel_limit_weight,
    ship_weights: globalField.ship_weights,
    isValidated: globalField.isValidated,
  }),
  {},
)(Main);
