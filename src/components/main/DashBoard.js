import React from 'react';
import './dashboard.css';

const DashBoard = props => {
  return (
    <div className="dashBoard">
      <div className="title">{props.title}</div>
      {props.content.map(el => {
        return (
          <div className="content">
            {el.key} : {el.value}
          </div>
        );
      })}
    </div>
  );
};

export default DashBoard;
