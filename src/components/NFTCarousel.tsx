import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class NFTCarousel extends Component {
    render() {
        return (
            <div id="carouselDiv">
            <Carousel
            autoPlay 
            showArrows
            centerMode 
            infiniteLoop 
            interval={6000} 
            centerSlidePercentage={100}
            showIndicators={false}
            emulateTouch
            showStatus={false}
            >
                <div>
                    <img src="assets/0.png" />
                </div>
                <div>
                    <img src="assets/1.png" />
                </div>
                <div>
                    <img src="assets/2.png" />
                </div>
                <div>
                    <img src="assets/3.png" />
                </div>
                <div>
                    <img src="assets/4.png" />
                </div>
                <div>
                    <img src="assets/5.png" />
                </div>
            </Carousel>
            </div>
        );
    }
};

export default NFTCarousel;