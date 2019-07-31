import React from 'react';
import Spaceship from './Spaceship';
import './deckPanel.css';

const DeckPanel = props => {
  const { shipsCount } = props;
  let spaceships = [];
  for (let i = 0; i < shipsCount; ++i) spaceships.push(<Spaceship />);
  return <div className="deckPanel">{spaceships}</div>;
};

export default DeckPanel;
