import React, { useEffect, useState } from "react";
import "../Sliders/Slider.css";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowForwardIos } from "@mui/icons-material";
import { slides } from "../../Services/slider-data";

const Sliders = () => {
  // set the current slide to the index of 0
  const [currentSlide, setCurrentSlide] = useState(0);

  // length of the slides
  const slideLength = slides.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000; // 5000ms is 5seconds

  const prevBtn = () => {
    //  if the currentSlide is equal to 0 set slideLength - 1 otherwise show previous currentSlide
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const nextBtn = () => {
    //  if the currentSlide is equal to 0 set slideLength - 1 otherwise show next currentSlide
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  // set timing for the next slides
  let auto = () => {
    slideInterval = setInterval(nextBtn, intervalTime);
  };

  useEffect(() => {
    if (autoScroll) {
      auto();
    }

    // clear or remove the slide inteval after sliding
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <div className="arrowIcon">
        <ArrowBackIos onClick={prevBtn} className="arrow prev" />
        <ArrowForwardIos onClick={nextBtn} className="arrow next" />
      </div>

      {/* loop through all the slides to get the slides */}
      {slides.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div className="slider_content">
                <img src={slide.image} alt={slide.Heading} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sliders;
