import React, { useEffect, useState } from 'react'
import AppRoutes from './Routes/AppRoutes'
import Layout from './Components/Common/Layout'
import { Constants } from './Configurations/Constants';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from './Store/actions/types';
import { setDefaultLang } from './Utils/indexUtils';

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
    if (appState.version !== Constants.version) {
      dispatch({ type: TYPES.RESET });
      dispatch({ type: TYPES.VERSION, data: Constants.version });
      if (!userLanguageData || !userLanguageData.language)
        setDefaultLang();
    }
  }, [])

  return (
    <AppRoutes />
  )
}
export default App
