import React from 'react';
import './inputField.css';
const InputField = props => {
  return (
    <div className="inputWrapper">
      <label>{props.title} : </label>
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        onChange={props.onChangedHandler}
      />
    </div>
  );
};

export default InputField;
