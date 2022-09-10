import React from 'react';
import logo from "../../Assets/images/main-logo.svg";
import phone from "../../Assets/icons/phone.svg";
import mail from "../../Assets/icons/mail.svg";
import location from "../../Assets/icons/location1.svg";
import { faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Constants } from '../../Configurations/Constants';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const navigate=useNavigate();
    return (
        <footer className=''>
            <div className='top-section'>
                <Row>
                    <Col xl={3} lg={3} md={3} sm={6} xs={12}>
                        <div className='list'>
                            <div className='logo-block'>
                                <img src={logo} alt="Events venue" />
                            </div>
                            <div className='list'>
                                <ul className='list-block contact-list'>
                                    <li>
                                        <img src={phone} alt="icon" />
                                        <div className='text'>+45 1234-5678</div>
                                    </li>
                                    <li>
                                        <img src={mail} alt="icon" />
                                        <div className='text'>info@eventex.com</div>
                                    </li>
                                    <li>
                                        <img src={location} alt="icon" />
                                        <div className='text'>250 rue de la Montagne Montreal, QC H7D 7K9</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={6} xs={12} className="">
                        <div className='list'>
                            <h3>{translations.QuickLinks}</h3>
                            <ul className='list-block'>
                                <li onClick={() => navigate("/about")}>
                                    <a>{translations.AboutUs}</a>
                                </li>
                                <li onClick={() => navigate("/venueList")}>
                                    <a>{translations.BrowseVenues}</a>
                                </li>
                                <li onClick={() => navigate("/addVenue")}>
                                    <a>{translations.AddVenue}</a>
                                </li>
                                <li onClick={() => navigate("/contactUs")}>
                                    <a>{translations.ContactUs}</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={2} sm={6} xs={12} className="">
                        <div className='list'>
                            <h3>{translations.Support}</h3>
                            <ul className='list-block'>
                                <li onClick={() => navigate("/help")}>
                                    <a>{translations.Help}</a>
                                </li>
                                <li onClick={() => navigate("/terms")}>
                                    <a>{translations.TermsOfUse}</a>
                                </li>
                                <li onClick={() => navigate("/privacy")}>
                                    <a>{translations.PrivacyPolicy}</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={4} sm={6} xs={12}>
                        <div className='list'>
                            <h3 className="">{translations.Connect}</h3>
                            <ul className='list-block social-icons'>
                                <li className='icon fb'><FontAwesomeIcon icon={faFacebookF} /></li>
                                <li className='icon twitter'><FontAwesomeIcon icon={faTwitter} /></li>
                                <li className='icon instagram'><FontAwesomeIcon icon={faInstagram} /></li>
                                <li className='icon youtube'><FontAwesomeIcon icon={faYoutube} /></li>
                                <li className='icon linkedin'><FontAwesomeIcon icon={faLinkedinIn} /></li>
                            </ul >
                        </div>
                    </Col >

                </Row >
            </div >
            <div className='bottom-section'>
                © {new Date().getFullYear()} {translations.EventVenue}. {translations.AllRightsReserved}. V {Constants.appVersion}
            </div>
        </footer >
    );
};



export default Footer;