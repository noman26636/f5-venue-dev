import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import ItemsCarousel from '../Common/ItemsCarousel';
import RatingStars from '../Venue/RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faMale } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const FeaturedVenues = (props) => {
    const { featuredVenuesList } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const numberOfItems = window.innerWidth > 3000 ? 9 : window.innerWidth > 2560 ? 7 : window.innerWidth > 2499 ? 6 : window.innerWidth > 2000 ? 5 :window.innerWidth > 1500 ? 4 : (window.innerWidth > 850 ? 3 : (window.innerWidth > 650 ? 2 : 1));
    const groups = Math.floor(featuredVenuesList.length / numberOfItems) + (featuredVenuesList.length % numberOfItems !== 0 ? 1 : 0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const navigate = useNavigate();
    return (
        <div className='featured-venue-block' >
            <div className='featured-venue-inner-block'>
                {/* <div className='title'> {translations.FeaturedVenues}</div> */}
                <ItemsCarousel items={featuredVenuesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            featuredVenuesList.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
                                <Col className='venue-block' key={i} xl={3} lg={3} md={4} onClick={() => { navigate(`/venue/${item.id}`) }}>
                                    <div className='image-block'>
                                        <img alt="" src={item.images?.length > 0 ? item.images[0].image_path : ""} />
                                    </div>
                                    <div className='venue-details'>
                                        <div className='venue-name'>{item.name}</div>
                                        <div className='rating-block'>
                                            <RatingStars rating={item.ratings_avg_rating} />
                                            <span className='reviews'>
                                                {item.ratings?.length} {item.ratings?.length !== 1 ? translations.Reviews : translations.Review}
                                            </span>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='guests mr-3'>
                                                <FontAwesomeIcon icon={faMale} className="icon" />
                                                <span className='guest-details'>{item.standing_capacity}</span>
                                            </div>
                                            <div className='guests'>
                                                <FontAwesomeIcon icon={faChair} className="icon" />
                                                <span className='guest-details'>{item.seating_capacity}</span>
                                            </div>
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