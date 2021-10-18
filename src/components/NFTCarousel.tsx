import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class NFTCarousel extends Component {
    render() {
        return (
            <div id="carouselDiv">
            <Carousel showArrows centerMode infiniteLoop interval={3000} centerSlidePercentage={100}>
                <div>
                    <img src="assets/0.png" />
                </div>
                <div>
                    <img src="assets/1.png" />
                </div>
                <div>
                    <img src="assets/2.png" />
                </div>
            </Carousel>
            </div>
        );
    }
};

export default NFTCarousel;