import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

let history = createBrowserHistory()

ReactDOM.render( 
  <BrowserRouter history={history}>
    <App />
    
  </BrowserRouter>,
  document.getElementById('root')
);

