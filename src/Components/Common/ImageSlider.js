import React from 'react'
import {
    CarouselControl,
    Carousel,
    CarouselItem,
} from 'reactstrap';
function ImageSlider(props) {
    const { items, slide = true } = props;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const itemLength = items.length - 1
    const previousButton = () => {
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const nextButton = () => {
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const carouselItemData = items?.map((item, i) => {
        return (
            <CarouselItem
                key={i}
            >
                <img alt="" src={item.image_path ? item.image_path : item} />
            </CarouselItem>
        );
    });

    return (
        <Carousel previous={previousButton} next={nextButton} interval={5000} slide={slide}
            activeIndex={activeIndex}>
            {/* <CarouselIndicators items={items}
                activeIndex={activeIndex}
                onClickHandler={(newIndex) => {
                    setActiveIndex(newIndex);
                }} /> */}
            {carouselItemData}
            <CarouselControl directionText="Prev"
                direction="prev" onClickHandler={previousButton} />
            <CarouselControl directionText="Next"
                direction="next" onClickHandler={nextButton} />
        </Carousel>
    );
}
export default ImageSlider;