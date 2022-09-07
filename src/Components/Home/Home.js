import React, { useEffect, useState } from 'react';
import FeaturedVenues from './FeaturedVenues';
import Main from './Main';
import HowItWorks from './HowItWorks';
import Features from './Features';
import GetStarted from './GetStarted';
import SignupModal from '../Signup/SignupModal';
import { VenueServices } from '../Venue/VenueServices';
import { useSelector } from 'react-redux';
let token=null;
function Home() {
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [eventTypesList, setEventTypesList] = useState([]);
    const [featuredVenuesList, setFeaturedVenuesList] = useState([]);
    const authState = useSelector((state) => {
        return state.auth;
    });
    const handleModalClose = () => {
        setShowSignupModal(false);
    }
    useEffect(() => {
        if (window.location.href.indexOf('token') !== -1) {
            const myUrl = new URL(window.location.href.replace(/#/g, '?'));
             token = myUrl.searchParams.get('token');
            setShowSignupModal(true);
        }
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
          { 
          !authState?.user?.access_token &&
           <GetStarted setShowSignupModal={setShowSignupModal} />}
            <SignupModal showModal={showSignupModal} handleClose={handleModalClose} invitationToken={token}/>
        </div>
    );
}

export default Home;