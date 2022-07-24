import React from 'react';
import { useSelector } from 'react-redux';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import guestIcon from "../../Assets/icons/guests.svg";
import {
    Col,
    Row,
} from 'reactstrap';
import ItemsCarousel from '../Common/ItemsCarousel';
const FeaturedVenues = (props) => {
    const { featuredVenuesList } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const numberOfItems = window.innerWidth > 1500 ? 4 : (window.innerWidth > 850 ? 3 : (window.innerWidth > 650 ? 2 : 1));
    const groups = Math.floor(featuredVenuesList.length / numberOfItems) + (featuredVenuesList.length % numberOfItems !== 0 ? 1 : 0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div className='featured-venue-block' >
            <div className='featured-venue-inner-block'>
                <div className='title'> {translations.FeaturedVenues}</div>
                <ItemsCarousel items={featuredVenuesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            featuredVenuesList.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
                                <Col className='venue-block' key={i} xl={3} lg={3} md={4}>
                                    <div className='image-block'>
                                        <img src={item.image} />
                                        <img src={item.logo} className="logo" />
                                    </div>
                                    <div className='venue-details'>
                                        <div className='venue-name'>{item.name}</div>
                                        <div className='rating-block'>
                                            <span className='ratings'>  {Array.from(Array(item.rating).keys(), n => n + 1)?.map(j => <img src={yellowStar} key={j} />)}</span>
                                            <span className='reviews'>{item.reviews} {translations.Reviews}</span>
                                        </div>
                                        <div className='guests'>
                                            <img src={guestIcon} />
                                            <span className='guest-details'>{item.guests} {translations.Guests}</span>
                                        </div>
                                        <p className='description'>
                                            {item.short_description}
                                        </p>
                                    </div>
                                </Col>
                            )}
                    </Row>

                </ItemsCarousel>
            </div>
        </div >
    );
};
export default FeaturedVenues;