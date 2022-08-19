import React from 'react';
import './index.css';
import './Css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';
import * as TYPES from './Store/actions/types';
import { toast } from 'react-toastify';
import { AccountApis } from './Configurations/Api_endpoints';
import { render } from "react-dom";
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
}, async function (error) {
  const originalConfig = error.config;
  if (originalConfig.url === AccountApis.refreshToken || originalConfig.url === AccountApis.login) {
    configureStore.dispatch({ type: TYPES.LOGOUT });
    if (window.location.pathname !== "/login") window.location.href = "/login";
  }
  let temp = await localStorage.getItem("state");
  temp = temp ? JSON.parse(temp) : null;
  if (error?.response?.status === 401 && !originalConfig._retry && temp?.auth?.user?.rememberMe) {
    debugger
    if (localStorage.getItem("isRefreshingToken")) return;
    originalConfig._retry = true;
    try {
      //TODO: To be removed after getting refresh token api and include remember me check
      localStorage.setItem("isRefreshingToken", true);
      const res = await axios.post(AccountApis.login, {
        email: "user@mailinator.com",
        password: "P@ssw0rd1",
      });
      localStorage.removeItem("isRefreshingToken");
      configureStore.dispatch({ type: TYPES.LOGIN, data: { ...res } });
      alert("token refreshed");
      return axios(originalConfig);
    } catch (_error) {
      localStorage.removeItem("isRefreshingToken");
      return Promise.reject(_error);
    }
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
render(
  <Provider store={configureStore}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
