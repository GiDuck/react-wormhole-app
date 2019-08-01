import React from 'react';
import './inputField.css';
import propTypes from 'prop-types';
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

InputField.propTypes = {
  title: propTypes.string,
  inputType: propTypes.string,
  onChangedHandler: propTypes.func,
};

export default InputField;
