import React from 'react';
import Intro from 'components/intro/Intro';

const IntroPage = ({ location, match, history }) => {
  return <Intro history={history} />;
};

export default IntroPage;
