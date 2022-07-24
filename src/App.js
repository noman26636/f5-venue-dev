import React, { useEffect, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import Layout from './Components/Common/Layout'
import { Constants } from './Configurations/Constants';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from './Store/actions/types';
import { setDefaultLang } from './Utils/indexUtils';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
const App = () => {
  const appState = useSelector(state => {
    return state.app;
  });
  const authState = useSelector(state => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const userLanguageData = appState.userLanguageData;
  const user = authState.user;

  useEffect(() => {
    if (appState.version !== Constants.appVersion) {
      dispatch({ type: TYPES.RESET });
      if (!userLanguageData || !userLanguageData.language)
        setDefaultLang();
    }
  }, [])

  return (
    <>
      <AppRoutes />
      <ToastContainer draggable={false} limit={1} transition={Slide} hideProgressBar={true} autoClose={3000} closeOnClick
        position="bottom-right" theme='colored'
      />
    </>
  )
}
export default App
