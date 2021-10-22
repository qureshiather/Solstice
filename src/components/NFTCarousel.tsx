import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class NFTCarousel extends Component {
  render() {
    return (
      <div className="gradient-border" id="Carouselbox">
      {/* <div id="carouselDiv"> */}
        <Carousel
          autoPlay
          showArrows
          centerMode
          infiniteLoop
          interval={4000}
          centerSlidePercentage={100}
          showIndicators={false}
          emulateTouch
          showStatus={false}
          showThumbs={false}
        >
          <div>
            <img src="assets/0.png" alt="Solstice #0" />
          </div>
          <div>
            <img src="assets/1.png" alt="Solstice #1" />
          </div>
          <div>
            <img src="assets/2.png" alt="Solstice #2" />
          </div>
          <div>
            <img src="assets/3.png" alt="Solstice #3" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default NFTCarousel;
