import React from 'react';
import './tunnel.css';
import Spaceship from './Spaceship';

const Tunnel = props => {
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
