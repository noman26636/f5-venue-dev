import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import sectionImg1 from "../../Assets/images/section2-img-1.png";
import sectionImg2 from "../../Assets/images/section2-img-2.png";
import sectionImg3 from "../../Assets/images/section2-img-3.png";
import Button from '../Common/Button';
import venueIcon from "../../Assets/icons/venue-red.svg";
import photoIcon from "../../Assets/icons/photo-red.svg";
import cardIcon from "../../Assets/icons/card-red.svg";
import guitarIcon from "../../Assets/icons/guitar-red.svg";
import decorIcon from "../../Assets/icons/decor-red.svg";
import transportIcon from "../../Assets/icons/transport-red.svg";
import calendarIcon from "../../Assets/icons/calendar.svg";
import cartIcon from "../../Assets/icons/cart.svg";
import SignupModal from '../Signup/SignupModal';

const Sections = () => {
    const navigate = useNavigate();
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showSignupModal, setShowSignupModal] = useState(false);
    const features = [{ icon: venueIcon, text: translations.VenueSelection },
    { icon: photoIcon, text: translations.PhotoVideoAudio },
    { icon: cardIcon, text: translations.InvitationCards },
    { icon: guitarIcon, text: translations.Entertaiment },
    { icon: decorIcon, text: translations.Decoration },
    { icon: transportIcon, text: translations.Transport }
    ];
    const handleModalClose = () => {
        setShowSignupModal(false);
    }
    return (
        <>
            <div className='home-sections'>
                {/* Section2 */}
                <Row className='section'>
                    <Col xl={6} lg={6} md={6} sm={12} className='text-block'>
                        <div className='number-block'>
                            <div className='bg'></div>
                            <div className='front'></div>
                            <span className='number'>1</span>
                        </div>
                        <div className='section-text'>
                            <h3 className='section-title'>{translations.Section2Title1}</h3>
                            <p >
                                {translations.Section2Desc1}
                            </p>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="image-block-wrap">
                        <div className='image-block'>
                            <div className='img-bg'></div>
                            <img alt="" src={sectionImg1} className='section-img' />
                        </div>
                    </Col>
                </Row>
                <Row className='section flex-row-reverse'>
                    <Col xl={6} lg={6} md={6} sm={12} className='text-block'>
                        <div className='number-block'>
                            <div className='bg'></div>
                            <div className='front'></div>
                            <span className='number'>2</span>
                        </div>
                        <div className='section-text'>
                            <h3 className='section-title'>{translations.Section2Title2}
                            </h3>
                            <p >
                                {translations.Section2Desc2}
                            </p>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="image-block-wrap">
                        <div className='image-block'>
                            <div className='img-bg'></div>
                            <img alt="" src={sectionImg2} className='section-img' />
                        </div>
                    </Col>
                </Row>
                <Row className='section'>
                    <Col xl={6} lg={6} md={6} sm={12} className='text-block'>
                        <div className='number-block'>
                            <div className='bg'></div>
                            <div className='front'></div>
                            <span className='number'>3</span>
                        </div>
                        <div className='section-text'>
                            <h3 className='section-title'>{translations.Section2Title3}</h3>
                            <p >
                                {translations.Section2Desc3}
                            </p>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="image-block-wrap">
                        <div className='image-block'>
                            <div className='img-bg'></div>
                            <img alt="" src={sectionImg3} className='section-img' />
                        </div>
                    </Col>
                </Row>
                {/* Section3 */}
                <Row className='section flex-row-reverse section-3'>
                    <Col xl={6} lg={6} md={6} sm={12} className='text-block'>

                        <div className='section-text'>
                            <div className='general-text'>
                                {translations.LookingForVenue}
                            </div>
                            <h3 className='section-title'>{translations.FindFastEasy}</h3>
                            <p >
                                {translations.LookingForVenueDesc}
                            </p>
                            <Button label={translations.BrowseVenues} onClick={() => { navigate("/") }} className="btn-white" />
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="feature-block-wrap">
                        <Row className="features-block">
                            {features?.map((item, i) =>
                                <Col xl={4} lg={4} md={6} sm={6} xs={6} className='feature-item' key={i}>
                                    <div className='icon-block'>
                                        <img alt="" src={item.icon} />
                                    </div>
                                    <div className='feature-text'>{item.text}</div>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>

            </div>
            {/* Section4 */}
            <div className='section-4'>
                <div className='top-block'>
                    <div className='section-text'>{translations.ReadyStarted}</div>
                    <h3 className='section-title'>{translations.DontHesitate} </h3>
                </div>
                <Row className='bottom-block'>
                    <Col xl={6} lg={6} md={6} sm={12}>
                        <div className='text-center place-self-end px-xl-5 px-lg-5'>
                            <img alt="" src={calendarIcon} />
                            <h3>{translations.PlanEvent}</h3>
                            <p>{translations.PlanEventDesc}</p>
                            <Button label={translations.SignUp} onClick={() => setShowSignupModal(true)} className="mt-3" />
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12}>
                        <div className='text-center place-self-start px-xl-5 px-lg-5'>
                            <img alt="" src={cartIcon} />
                            <h3>{translations.AddVenue}</h3>
                            <p>{translations.AddVenueDesc}</p>
                            <Button label={translations.BecomeSupplier} onClick={() => setShowSignupModal(true)} className="mt-3" />
                        </div>
                    </Col>
                </Row>
            </div>
            <SignupModal showModal={showSignupModal} handleClose={handleModalClose} />
        </>
    );
};

export default Sections;