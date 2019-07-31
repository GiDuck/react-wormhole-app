import React from 'react';
import { Route } from 'react-router-dom';
import { IntroPage, MainPage } from './pages/index';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={IntroPage} />
      <Route exact path="/main" component={MainPage} />
    </React.Fragment>
  );
}

export default App;
