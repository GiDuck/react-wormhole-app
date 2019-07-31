import React from 'react';
import './tunnel.css';
import Spaceship from './Spaceship';

const Tunnel = props => {
  //웜홀의 길이는 Section으로 나눈다. 만약 현재 순회하는 배열 값에 우주선이 있으면 우주선을 포함하여 출력한다.
  const { acrossShips } = props;
  return (
    <div className="tunnel">
      {acrossShips.map(ship => {
        if (ship === -1) return <div className="section" />;
        else
          return (
            <div className="section">
              <Spaceship />
            </div>
          );
      })}
    </div>
  );
};

export default Tunnel;
