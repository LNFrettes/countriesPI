import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './Store/index'
import axios from 'axios';
// require('dotenv').config();

axios.defaults.baseURL = 'https://countriespi.herokuapp.com' || "http://localhost:3001";



ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
