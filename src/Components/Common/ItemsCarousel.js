import React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
    Col,
    Row,
    CarouselControl,
} from 'reactstrap';
const ItemsCarousel = (props) => {
    const { items, children, groups, activeIndex, setActiveIndex } = props;
    const previousButton = () => {
        const nextIndex = activeIndex === 0 ?
            groups - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const nextButton = () => {
        const nextIndex = activeIndex === (groups - 1) ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    return (
        <Carousel previous={previousButton} next={nextButton} activeIndex={activeIndex} slide={false} interval={4000000} >
            {window.innerWidth > 600 &&
                <CarouselIndicators items={[...Array(groups).keys()]}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        setActiveIndex(newIndex);
                    }} />
            }
            {
                [...Array(groups).keys()]?.map(k => <CarouselItem key={k} >
                    {children}
                    {/* {window.innerWidth <= 600 && */}
                    <>
                        <CarouselControl directionText="Prev"
                            direction="prev" onClickHandler={previousButton} />
                        <CarouselControl directionText="Next"
                            direction="next" onClickHandler={nextButton} />
                    </>
                    {/* } */}
                </CarouselItem>
                )
            }

        </Carousel >
    );
};

export default ItemsCarousel;