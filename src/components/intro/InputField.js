import React from "react";
import "./inputField.css";
const InputField = (props) => {
    return (
    <div className="inputWrapper">
        <label >{props.title} : </label>
        <input key={props.ide} type={props.inputType} placeholder={props.placeholder} onChange={props.onChangedHandler}/>
    </div>
    );
}

export default InputField;