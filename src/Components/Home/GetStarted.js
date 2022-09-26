import React from 'react';
import { Col, Row } from 'reactstrap';
import Button from '../Common/Button';
import calendarIcon from "../../Assets/icons/calendar.svg";
import cartIcon from "../../Assets/icons/cart.svg";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GetStarted = (props) => {
    const { setShowSignupModal } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    return (
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
                        <Button label={translations.SignUp} onClick={() => setShowSignupModal(true)} className="mt-3" wrapperClass="m-auto" />
                    </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12}>
                    <div className='text-center place-self-start px-xl-5 px-lg-5'>
                        <img alt="" src={cartIcon} />
                        <h3>{translations.AddVenue}</h3>
                        <p>{translations.AddVenueDesc}</p>
                        <Button label={translations.BecomeSupplier} onClick={() => setShowSignupModal(true)} className="mt-3"
                            wrapperClass="m-auto" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default GetStarted;