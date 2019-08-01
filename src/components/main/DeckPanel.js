import React from 'react';
import Spaceship from './Spaceship';
import './deckPanel.css';
import propTypes from 'prop-types';

const DeckPanel = props => {
  const { shipsCount, title } = props;
  let spaceships = [];
  for (let i = 0; i < shipsCount; ++i) spaceships.push(<Spaceship key={ title + i }/>);
  return <div className="deckPanel">{spaceships}</div>;
};

DeckPanel.propTypes = {
  shipsCount: propTypes.number,
};

export default DeckPanel;
