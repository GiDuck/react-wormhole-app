import React from 'react';
import './tunnel.css';
import Spaceship from './Spaceship';
import propTypes from 'prop-types';

const Tunnel = props => {
  //웜홀의 길이는 Section으로 나눈다. 만약 현재 순회하는 배열 값에 우주선이 있으면 우주선을 포함하여 출력한다.
  const { acrossShips } = props;
  return (
    <div className="tunnel">
      {acrossShips.map((ship, i) => {
        if (ship === -1) return <div className="section" key={"section" + i} />;
        else
          return (
            <div className="section" key={"section" + i}> 
              <Spaceship key={"in-tunnel-ship" + i}/>
            </div>
          );
      })}
    </div>
  );
};

Tunnel.propTypes = {
  acrossShips: propTypes.array,
};

export default Tunnel;
