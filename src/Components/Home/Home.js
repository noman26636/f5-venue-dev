import React, { useEffect, useState } from 'react';
import FeaturedVenues from './FeaturedVenues';
import venueDummyImg from "../../Assets/images/venue-dummy-img.png";
import Main from './Main';
import HowItWorks from './HowItWorks';
import Features from './Features';
import GetStarted from './GetStarted';
import SignupModal from '../Signup/SignupModal';
import Modal from '../Common/Modal';
import { useSelector } from 'react-redux';
import { VenueServices } from '../Venue/VenueServices';

const featuredVenuesList = [
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue1",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue2",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue3",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue4",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue5",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue6",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue7",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue8",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue9",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue10",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue11",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue12",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue11",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue12",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing "
    }
];

function Home() {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [eventTypesList, setEventTypesList] = useState([]);
    const [moreServicesList, setMoreServicesList] = useState([]);
    const handleModalClose = () => {
        setShowSignupModal(false);
    }
    useEffect(() => {
        VenueServices.getConfigList().then(res => {
            if (!res.isAxiosError) {
                setEventTypesList(res.event_types);
                setMoreServicesList(res.services);
            }
        });
    }, [])
    return (
        <div className='home-page'>
            <Main eventTypesList={eventTypesList} />
            <FeaturedVenues featuredVenuesList={featuredVenuesList.length > 20 ? featuredVenuesList.slice(0, 20) : featuredVenuesList} />
            <HowItWorks />
            <Features />
            <GetStarted setShowSignupModal={setShowSignupModal} />
            <SignupModal showModal={showSignupModal} handleClose={handleModalClose} />
        </div>
    );
}

export default Home;