import React from 'react';
import { useSelector } from 'react-redux';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import personImg from "../../Assets/icons/personImage.svg";

import {
    Col,
    Row,
} from 'reactstrap';
import ItemsCarousel from '../Common/ItemsCarousel';
import RatingStars from './RatingStars';
export const ReviewsSlider = (props) => {
    const { reviews, avgRating } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const numberOfItems = window.innerWidth > 1500 ? 4 : (window.innerWidth > 850 ? 3 : (window.innerWidth > 650 ? 2 : 1));
    const groups = Math.floor(reviews.length / numberOfItems) + (reviews.length % numberOfItems !== 0 ? 1 : 0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div className='featured-venue-block reviews-slider' >
            <div className='featured-venue-inner-block'>
                <div className='title'>
                    <img alt="" src={yellowStar} className='mr-3' />
                    <span className=''>{parseFloat(avgRating).toFixed(2)}</span>
                    <span className='ml-3'>{reviews.length}</span>
                    <span className='ml-3'>   {reviews.length > 1 ? translations.Reviews : translations.Review}</span>
                </div>
                <ItemsCarousel items={reviews} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            reviews.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
                                <Col className='venue-block' key={i} xl={3} lg={3} md={4}>
                                    <div className='image-block'>
                                        <img alt="" src={item.image ? item.image : personImg} className="person-img" />
                                        <div className='review-header'>
                                            <div >{item.name ? item.name : translations.Anonymous}</div>
                                            <RatingStars rating={item.rating} />
                                        </div>

                                    </div>
                                    <div className='venue-details'>
                                        <p className='description'>
                                            {item.body}
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