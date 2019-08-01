import React from 'react';
import './dashboard.css';
import propTypes from 'prop-types';

const DashBoard = props => {
  return (
    <div className="dashBoard">
      <div className="title">{props.title}</div>
      {props.content.map(el => {
        return (
          <div key={el.key} className="content">
            {el.key} : {el.value}
          </div>
        );
      })}
    </div>
  );
};

DashBoard.propTypes = {
  title: propTypes.string,
  content: propTypes.array,
};

export default DashBoard;
