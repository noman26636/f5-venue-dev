import React, { useEffect } from 'react'
import AppRoutes from './Routes/AppRoutes'
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
  const dispatch = useDispatch();
  const userLanguageData = appState.userLanguageData;

  useEffect(() => {
    if (appState.version !== Constants.appVersion) {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
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
