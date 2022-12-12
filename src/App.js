import React, { useEffect, Suspense } from 'react'
import AppRoutes from './Routes/AppRoutes'
import { Constants } from './Configurations/Constants';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from './Store/actions/types';
import { setDefaultLang } from './Utils/indexUtils';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import  LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend';
import cookies from 'js-cookie'
import { useLocation } from 'react-router-dom';


const App = () => {
  
  const appState = useSelector(state => {
    return state.app;
  });
  const dispatch = useDispatch();
  const userLanguageData = appState.userLanguageData;
 
  // i18n
  // .use(initReactI18next) // passes i18n down to react-i18next
  // .use(LanguageDetector)
  // .use(HttpApi)
  // .init({
  //   supportedLngs: ['en', 'dk'],
  //   // debug: false,
  //   fallbackLng: 'dk',
  //   detection: {
  //     order: ['cookie','htmlTag','localStorage','path','subdomain'],
  //     caches: ['cookie', 'localStorage'],
  //   },
  //   backend: {
  //     loadPath: '/locales/id/{{lng}}/translation.json'
  //   }
  // });

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
    {/* <Suspense> */}
    <AppRoutes />
    <ToastContainer draggable={false} limit={1} transition={Slide} hideProgressBar={true} autoClose={3000} closeOnClick
      position="bottom-right" theme='colored'
    />
    {/* </Suspense> */}
    </>
  )
}
export default App
