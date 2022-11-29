import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { HomeServices } from './HomeServices';
const HowItWorks = () => {
    const [data, setData] = useState([]);
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;

    useEffect(()=>{
        HomeServices.getFeaturedVenue().then(res =>{
            if (!res.isAxiosError) {
            setData(res.homepage)
            }
        })
   },[])
   

    return (
        data.filter((item) => item.slug === "how-it-works").map((item) => (
            <div className='how-it-works-section'>
            <h2 className='section-title'>How It Works</h2>
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

        ))
    )
            
    
};

export default HowItWorks;