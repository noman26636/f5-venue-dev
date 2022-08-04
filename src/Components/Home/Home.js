import React, { useEffect, useState } from 'react';
import FeaturedVenues from './FeaturedVenues';
import venueDummyImg from "../../Assets/images/venue-dummy-img.png";
import Main from './Main';
import HowItWorks from './HowItWorks';
import Features from './Features';
import GetStarted from './GetStarted';
import SignupModal from '../Signup/SignupModal';
import { useSelector } from 'react-redux';
import { VenueServices } from '../Venue/VenueServices';
function Home() {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [eventTypesList, setEventTypesList] = useState([]);
    const [featuredVenuesList, setFeaturedVenuesList] = useState([]);
    const handleModalClose = () => {
        setShowSignupModal(false);
    }
    useEffect(() => {
        VenueServices.getConfigList().then(res => {
            if (!res.isAxiosError) {
                setEventTypesList(res.event_types);
                getFeaturedVenues();
            }
        });
    }, [])
    const getFeaturedVenues = () => {
        VenueServices.getFeaturedVenues().then(res => {
            if (!res.isAxiosError) {
                setFeaturedVenuesList(res.venues);
            }
        });
    }
    return (
        <div className='home-page'>
            <Main eventTypesList={eventTypesList} />
            {featuredVenuesList?.length > 0 && <FeaturedVenues featuredVenuesList={featuredVenuesList.length > 20 ? featuredVenuesList.slice(0, 20) : featuredVenuesList} />}
            <HowItWorks />
            <Features />
            <GetStarted setShowSignupModal={setShowSignupModal} />
            <SignupModal showModal={showSignupModal} handleClose={handleModalClose} />
        </div>
    );
}

export default Home;