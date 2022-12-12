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
import { useState } from 'react';
import { useEffect } from 'react';
import { VenueServices } from '../Venue/VenueServices';
import { HomeServices } from './HomeServices';
const Features = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const [data, setData] = useState([]);
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

    const to_Browse_Venues = () => {
        navigate("/venueList");
    }
    useEffect(() => {
        getFeatureSection();
    }, []);

    const getFeatureSection = () => {
        HomeServices.getFeaturesServices().then((res) => {
            if (!res.isAxiosError) {
                setData(res.homepage)
            }

        }).then(() => {
            var btn_browse = document.getElementById("btn-browse");
            btn_browse.addEventListener("click", to_Browse_Venues)
        })
    }
    return (
        data.filter((item) => item.slug === "features").map((item) => {
            return (
                <div>
                    <div key={item.id} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
            )
        })
    );
};

export default Features;