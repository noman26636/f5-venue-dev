import React from "react";
import "./index.css";
import "./Css/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore";
import * as TYPES from "./Store/actions/types";
import { toast } from "react-toastify";
import { AccountApis } from "./Configurations/Api_endpoints";
import { render } from "react-dom";
axios.interceptors.request.use(
  async function (req) {
    let temp = await localStorage.getItem("state");
    if (temp) {
      temp = JSON.parse(temp);
      if (temp.auth.user) {
        req.headers["Authorization"] = `Bearer ${temp.auth.user.access_token}`;
      }
    }
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    const originalConfig = error.config;
    let temp = await localStorage.getItem("state");
    temp = temp ? JSON.parse(temp) : null;
    const translations = temp.app.userLanguageData.translations; 
    if (
      originalConfig.url === AccountApis.refreshToken ||
      originalConfig.url === AccountApis.login ||
      originalConfig.url === AccountApis.logout
    ) {
      configureStore.dispatch({ type: TYPES.LOGOUT });
      if (window.location.pathname !== "/login")
        window.location.href = "/login";
    }
    if (
      temp?.auth?.user?.access_token &&
      error?.response?.status === 401 &&
      !originalConfig._retry &&
      temp?.auth?.user?.rememberMe
    ) {
      if (localStorage.getItem("isRefreshingToken")) return;
      originalConfig._retry = true;
      try {
        localStorage.setItem("isRefreshingToken", true);
        const res = await axios.get(AccountApis.refreshToken);
        if(res?.data?.token)  
       { localStorage.removeItem("isRefreshingToken");
        configureStore.dispatch({ type: TYPES.LOGIN, data: {...temp.auth.user, access_token:res.data.token} });
        console.log("token refreshed");
        return axios(originalConfig);
      }
      } catch (_error) {
        console.log("token refresh error");
        localStorage.removeItem("isRefreshingToken");
        toast.error(translations.SomethingWentWrong);
        configureStore.dispatch({ type: TYPES.LOGOUT });
        if (window.location.pathname !== "/login")
          window.location.href = "/login";
        return Promise.reject(_error);
      }
    } else {
      if(translations)
      toast.error(translations.SomethingWentWrong);
      return Promise.reject(error);
    }
  }
);
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
reportWebVitals();
