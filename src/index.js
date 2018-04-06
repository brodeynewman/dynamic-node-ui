import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import store from './redux/store';
import './styles/main.css';

/**
 * Renders to the DOM
 */
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'),
);
