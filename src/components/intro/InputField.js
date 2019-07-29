import React from "react";
import "./inputField.css";
const InputField = (props) => {
    return (
    <div className="inputWrapper">
        <label >{props.title} : </label>
        <input key={props.key} type={props.inputType} placeholder={props.placeholder} />
    </div>
    );
}

export default InputField;