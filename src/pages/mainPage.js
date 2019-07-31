import React from 'react';
import Main from '../components/main/Main';
const MainPage = ({ location, match, history }) => {
  return <Main location={location} match={match} history={history} />;
};

export default MainPage;
