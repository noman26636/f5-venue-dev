import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import ItemsCarousel from '../Common/ItemsCarousel';
import RatingStars from './RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faMale } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export const SimilarVenues = (props) => {
    const { similarVenuesList } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const numberOfItems = window.innerWidth > 1500 ? 4 : (window.innerWidth > 850 ? 3 : (window.innerWidth > 650 ? 2 : 1));
    const groups = Math.floor(similarVenuesList.length / numberOfItems) + (similarVenuesList.length % numberOfItems !== 0 ? 1 : 0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const navigate = useNavigate();
    return (
        <div className='featured-venue-block' >
            <div className='featured-venue-inner-block'>
                <div className='title'> {translations.SimilarVenues}</div>
                <ItemsCarousel items={similarVenuesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            similarVenuesList.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
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