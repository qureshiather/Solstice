import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const slides = [
  { src: "assets/1.png", alt: "Sample art 1" },
  { src: "assets/2.png", alt: "Sample art 2" },
  { src: "assets/3.png", alt: "Sample art 3" },
  { src: "assets/4.png", alt: "Sample art 4" },
  { src: "assets/5.png", alt: "Sample art 5" },
];

export const ArtCarousel = () => {
  return (
    <div id="Carouselbox">
      <Carousel
        autoPlay
        showArrows
        infiniteLoop
        interval={4000}
        showIndicators={false}
        emulateTouch
        showStatus={false}
        showThumbs={false}
      >
        {slides.map((slide) => (
          <div key={slide.src}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtCarousel;
