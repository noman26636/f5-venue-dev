import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import image2 from "../../Assets/images/add-venue-img-2.png";
import arrowRightCircle from "../../Assets/icons/ArrowCircleRight.svg";
const AddVenueLanding = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const navigate = useNavigate();
    return (
        <div className='add-venue-landing'>
            <div className='main-section'>
                <h2 className='title'>
                    {translations.EarnMoreRevenue}
                </h2>
                <p className='sub-title'>
                    &gt;{translations.ThousandsEventBookers}
                </p>
                <Button label={translations.CreateProfile} onClick={() => navigate("/login?redirectUrl=addVenueForm")} className={`btn-white create-profile-btn`}
                    wrapperClass="w-100"
                />
            </div>
            <div className='section-2'>
                <Row >
                    <Col xl={6} lg={6} className="left-section"><img alt="" src={image2} /></Col>
                    <Col xl={6} lg={6} className="right-section">
                        <h2>{translations.ChooseWhoBooks}</h2>
                        <div className='text my-4'>{translations.YouHaveFullControl}</div>
                        <ul className='text-list'>
                            <li className='list-item'>
                                <img alt="" src={arrowRightCircle} className="icon" />
                                <span className='text'>{translations.YouHaveFullControl_1}</span>
                            </li>
                            <li className='list-item'>
                                <img alt="" src={arrowRightCircle} className="icon" />
                                <span className='text'>{translations.YouHaveFullControl_2}</span>
                            </li>
                            <li className='list-item'>
                                <img alt="" src={arrowRightCircle} className="icon" />
                                <span className='text'>{translations.YouHaveFullControl_3}</span>
                            </li>
                            <li className='list-item'>
                                <img alt="" src={arrowRightCircle} className="icon" />
                                <span className='text'>{translations.YouHaveFullControl_4}</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>

            <div className='section-3'>
                <h2 className='section-title'>{translations.GetStarted}</h2>
                <h2 className='section-subtitle'>{translations.GetStarted_Desc}</h2>
                <Row className='section-items'>
                    <Col className='section-item' xl={4} lg={4} md={4}>
                        <h3 className='title'>{translations.GetStartedTitle1}</h3>
                        <p>{translations.GetStartedDesc1}</p>
                    </Col>
                    <Col className='section-item' xl={4} lg={4} md={4}>
                        <h3 className='title'>{translations.GetStartedTitle2}</h3>
                        <p>{translations.GetStartedDesc2}</p>
                    </Col>
                    <Col className='section-item' xl={4} lg={4} md={4}>
                        <h3 className='title'>{translations.GetStartedTitle3}</h3>
                        <p>{translations.GetStartedDesc3}</p>
                    </Col>
                </Row>
                <Button label={translations.CreateProfile} onClick={() =>  navigate("/login?redirectUrl=addVenueForm")} className={`create-profile-btn`}
                    wrapperClass="w-100" />
            </div>
        </div>
    );
};
export default AddVenueLanding;