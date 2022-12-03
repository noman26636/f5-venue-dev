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

    useEffect(() => {
        HomeServices.getHomeServices().then(res => {
            if (!res.isAxiosError) {
                setData(res.homepage)
            }
        })
    }, [])
    return (
        data.filter((item) => item.slug === "how-it-works").map((item) => {
            return (
                <div key={item.id} className='how-it-works-section'>
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
            )
        })
    )
};

export default HowItWorks;