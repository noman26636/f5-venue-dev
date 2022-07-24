import React from 'react';
import './index.css';
import './Css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';
import * as TYPES from './Store/actions/types';
import { toast } from 'react-toastify';
axios.interceptors.request.use(async function (req) {
  let temp = await localStorage.getItem("state");
  if (temp) {
    temp = JSON.parse(temp);
    if (temp.auth.user) {
      req.headers['Authorization'] = `Bearer ${temp.auth.user.access_token}`;
    }
  }
  return req;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (res) {
  return res;
}, function (error) {
  if (window.location.pathname === "/login")
    return Promise.reject(error);
  if (error?.response?.status === 401) {
    configureStore.dispatch({ type: TYPES.LOGOUT });
    window.location.href = "/login";
  }
  else {
    let temp = localStorage.getItem("state");
    if (temp) {
      temp = JSON.parse(temp);
      const translations = temp.app.userLanguageData.translations
      toast.error(translations.SomethingWentWrong);
    }
    return Promise.reject(error);
  }
});
createRoot(document.getElementById('root')).render(
  <Provider store={configureStore}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
