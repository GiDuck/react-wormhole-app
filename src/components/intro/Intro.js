import React from 'react';
import "./intro.css";
import {connect} from 'react-redux';
import InputField from './InputField';

const validate = (value, type) => {

    switch (type){
        case "number" : 
            if(/^(\+)?([\d]+|Infinity)$/.test(value) && value > 0){
                return Number(value);
            }
            return false;
        case "array" : 
            if(/^(\+)?[\d\,]+$/.test(value)){
                const weightsArr = value.split(',');
                weightsArr = weightsArr.filter(weight => {
                    return weight > 0;
                });
                return weightsArr;
            }
            return false;
        default : 
            new Error("검증 실패. 어떤 case에도 일치되지 않음.");
    }
    

}

const inputDatas = () => ([
    {
        key : "tunnel_length", 
        title : "웜홀 길이", 
        placeholder : "웜홀의 길이를 입력하세요.", 
        inputType : "number"
    },
    {
        key : "tunnel_limit_weight", 
        title : "웜홀 하중", 
        placeholder : "웜홀이 버틸 수 있는 총 무게를 설정하세요.", 
        inputType : "number"},
    {
        key : "ship_weights", 
        title : "우주선 무게", 
        placeholder : "웜홀을 건널 우주선들의 무게를 , 로 나누어 설정하세요.", 
        inputType : "string"}
]);



class Intro extends React.Component{

    

    render(){
        return(<div className="wrapper">
            {inputDatas().map(input => {
                 return <InputField {...input}/>
            })}
        </div>);
    };
}

export default Intro;