import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import logo from "../../Assets/images/main-logo.svg";
import logo from "../../Assets/images/logo-blue.svg";
import burgerMenu from "../../Assets/icons/menu-icon.svg";
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from '../../Store/actions/types';
import Button from './Button';
import { AccountServices } from '../Signup/AccountServices';
import { Row, Col } from 'reactstrap';
import SignupModal from '../Signup/SignupModal';
import Modal from '../Common/Modal';
import LeftMenu from './LeftMenu';

export default function Header(props) {
  const { } = props;
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [active, setActive] = useState(0);
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
  const menuOptions = [{ text: translations.BrowseVenues, path: "/venueList" },
  { text: translations.Wishlist, path: "/wishlists" },
  { text: translations.ContactUs, path: "/contactUs" }
  ]
  const menuOptions_loggedIn = [{ text: translations.BrowseVenues, path: "/venueList" },
  { text: translations.Inquiries, path: "/inquiries" },
  { text: translations.ManageVenues, path: "/manageVenues" },
  { text: translations.YourProfile, path: "/profile" },
  { text: translations.YourCompany, path: "/company" },
  ]
  const logout = () => {
    // setShowLoader(true);
    AccountServices.logout().then(res => {
      // setShowLoader(false);
      dispatch({ type: TYPES.LOGOUT });
      navigate(`/home`);
    });
  }
  const handleModalClose = () => {
    setShowSignupModal(false);
  }
  const getMenuOptions = () => {
    if (authState?.user?.access_token)
      return menuOptions_loggedIn;
    else
      return menuOptions;
  }
  const toggleMenu = (value = !showLeftMenu) => {
    setShowLeftMenu(value);
  }
  return (
    <>
      <header>
        <Row className="header-block">
          <Col xl={1} lg={1} md={1} sm={6} xs={6} className="header-img" onClick={() => { navigate("/home") }}>
            <img src={logo} alt="logo" className="desktop-logo" />
          </Col>
          <Col xl={8} className="large-hidden">
            <nav>
              <ul className="menu-items">
                {getMenuOptions()?.map((item, i) => <li className={`menu-item ${i === active ? "active" : ""}`} key={i}><a onClick={() => { setActive(i); navigate(item.path) }}>{item.text}</a></li>
                )}
              </ul>
            </nav>
          </Col>
          <Col xl={4} className="header-right" >
            <div className='medium-hidden d-flex align-items-center'>
              {authState?.user?.access_token ?
                <div className='nav-links mx-lg-0'>
                  <Button label={translations.Logout} onClick={() => logout()} className={`small-btn`} />
                </div>
                :
                <div className='nav-links ml-0'>
                  <a onClick={() => navigate("/login")}>{translations.Login}</a> | <a onClick={() => setShowSignupModal(true)}>{translations.SignUp}</a>
                </div>
              }
              {!authState?.user?.access_token &&
                <Button label={translations.AddVenue} onClick={() => navigate("/addVenue")} className={`small-btn`} />}
            </div>
            <div className='burger-menu-block mx-3'>
              <button type="button" className="burger-menu" onClick={() => toggleMenu()}>
                <img src={burgerMenu} />
              </button>
            </div>
          </Col>
        </Row>
        <SignupModal showModal={showSignupModal} handleClose={handleModalClose} />
      </header >
      <LeftMenu menuOptions={getMenuOptions()} showLeftMenu={showLeftMenu} toggleMenu={toggleMenu} logout={logout}
        setShowSignupModal={setShowSignupModal} active={active} setActive={setActive} />
    </>
  )
}
