import React from 'react';
import './submitButton.css';
import propTypes from 'prop-types';

const SubmitButton = props => (
  <div className="submitButton" onClick={props.clickHandler} />
);

SubmitButton.propTypes = {
  clickHandler: propTypes.func,
};

export default SubmitButton;
