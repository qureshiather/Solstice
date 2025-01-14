import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export const ArtCarousel = () => {
  return (
    <div
      id="Carouselbox"
      style={{
        border: "3px solid #939ab7", // Sky color
        borderRadius: "4px", // Rounded corners
      }}
    >
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
          <img src="assets/1.png" alt="#1" />
        </div>
        <div>
          <img src="assets/2.png" alt="#2" />
        </div>
        <div>
          <img src="assets/3.png" alt="#3" />
        </div>
        <div>
          <img src="assets/4.png" alt="#4" />
        </div>
        <div>
          <img src="assets/5.png" alt="#5" />
        </div>
      </Carousel>
    </div>
  );
};

export default ArtCarousel;
