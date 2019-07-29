import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component{


    componentWillMount(){
        const {history, isValidated} = this.props;
        if(isValidated === false){
            alert("잘못된 접근입니다.");
            history.push("/");
        }

    }

    render(){
        return (<div>새로운 메인 페이지</div>);
    }


}

export default connect(
    ({globalField})=>({
    tunnel_length : globalField.tunnel_length, 
    tunnel_limit_weight : globalField.tunnel_limit_weight, 
    ship_weights : globalField.ship_weights,
    isValidated : globalField.isValidated

}), ({}))(Main);