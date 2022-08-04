import React from 'react';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import unfilledStar from "../../Assets/icons/unfilledStar.svg";
const RatingStars = (props) => {
    const { rating } = props;
    return (
        <span className='ratings d-flex'>
            {[1, 2, 3, 4, 5].map((item1, j) => {
                return (
                    <img
                        key={j}
                        src={(j + 1) <= Math.ceil(Number(rating)) ? yellowStar : unfilledStar}
                        className="rating-star"
                        alt=""
                    />
                )
            })}

        </span>
    );
};

export default RatingStars;