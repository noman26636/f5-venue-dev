import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../../Assets/images/logo-white.svg";
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { AccountSevices } from '../Signup/AccountSevices';
import * as TYPES from '../../Store/actions/types';

export default function Header(props) {
  const {
    addVenue,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appState = useSelector((state) => {
    return state.app;
  });
  const authState = useSelector((state) => {
    return state.auth;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const logout = () => {
    // setShowLoader(true);
    AccountSevices.logout().then(res => {
      // setShowLoader(false);
      dispatch({ type: TYPES.LOGOUT });
      navigate(`/home`);
    });
  }
  return (
    <header className="header-block">
      <div className="header-img" onClick={() => navigate("/home")}>
        <img src={logo} alt="logo" className="desktop-logo" />
      </div>
      <nav>
        <ul className="menu-items">
          <li className="menu-item"><a onClick={() => navigate("/")}>{translations.BrowseVenues}</a></li>
          <li className="menu-item"><a onClick={() => navigate("/")}>{translations.Wishlist}</a></li>
          <li className="menu-item"><a onClick={() => navigate("/")}>{translations.ContactUs}</a></li>
        </ul>
      </nav>
      <div className="header-right">
        {authState?.user?.access_token ?
          <div className='nav-links'>
            <a>
              {/* {authState.user.userName} */}
              Username
            </a> | <a onClick={() => logout()}>{translations.Logout}</a>

          </div>
          :
          <div className='nav-links'>
            <a onClick={() => navigate("/login")}>{translations.Login}</a> | <a onClick={() => navigate("/signUp")}>{translations.SignUp}</a>
          </div>
        }
        <Button label={translations.AddVenue} onClick={addVenue} className="btn-white small-btn" />
      </div>
    </header >
  )
}
