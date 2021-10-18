import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
          showThumbs={false}
        >
          <div>
            <img src="assets/0.png" alt="Solambo #0" />
          </div>
          <div>
            <img src="assets/1.png" alt="Solambo #1" />
          </div>
          <div>
            <img src="assets/2.png" alt="Solambo #2" />
          </div>
          <div>
            <img src="assets/3.png" alt="Solambo #3" />
          </div>
          <div>
            <img src="assets/4.png" alt="Solambo #4" />
          </div>
          <div>
            <img src="assets/5.png" alt="Solambo #5" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default NFTCarousel;
