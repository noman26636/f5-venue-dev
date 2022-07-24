import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

const HowItWorks = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    return (
        <div className='how-it-works-section'>
            <h2 className='section-title'>{translations.HowItWorks}</h2>
            <Row className='section-items'>
                <Col className='section-item' xl={4} lg={4} md={4}>
                    <h3 className='title'>{translations.Section2Title1}</h3>
                    <p>{translations.Section2Desc1}</p>
                </Col>
                <Col className='section-item' xl={4} lg={4} md={4}>
                    <h3 className='title'>{translations.Section2Title2}</h3>
                    <p>{translations.Section2Desc2}</p>
                </Col>
                <Col className='section-item' xl={4} lg={4} md={4}>
                    <h3 className='title'>{translations.Section2Title3}</h3>
                    <p>{translations.Section2Desc3}</p>
                </Col>
            </Row>
        </div>
    );
};

export default HowItWorks;