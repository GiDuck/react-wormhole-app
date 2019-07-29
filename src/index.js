import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './stores'
import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
</Provider>, document.getElementById('root'));

