import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Button from '../Common/Button';
import venueIcon from "../../Assets/icons/venue-red.svg";
import photoIcon from "../../Assets/icons/photo-red.svg";
import cardIcon from "../../Assets/icons/card-red.svg";
import guitarIcon from "../../Assets/icons/guitar-red.svg";
import decorIcon from "../../Assets/icons/decor-red.svg";
import transportIcon from "../../Assets/icons/transport-red.svg";
import { useNavigate } from 'react-router-dom';
const Features = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const navigate = useNavigate();
    const features = [{ icon: venueIcon, text: translations.VenueSelection },
    { icon: photoIcon, text: translations.PhotoVideoAudio },
    { icon: cardIcon, text: translations.InvitationCards },
    { icon: guitarIcon, text: translations.Entertaiment },
    { icon: decorIcon, text: translations.Decoration },
    { icon: transportIcon, text: translations.Transport }
    ];
    return (
        <Row className='section-3'>
            <Col xl={6} lg={6} md={6} sm={12} className="feature-block-wrap">
                <Row className="features-block">
                    {features?.map((item, i) =>
                        <Col xl={4} lg={4} md={6} sm={6} xs={6} className='feature-item' key={i}>
                            <div className='icon-block'>
                                <img src={item.icon} />
                            </div>
                            <div className='feature-text'>{item.text}</div>
                        </Col>
                    )}
                </Row>
            </Col>
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

        </Row>

    );
};

export default Features;