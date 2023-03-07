import React, { useState, useEffect } from "react";

import "./carousel.css";
import { sliderItems } from "./data";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    setTimeout(() => {
      setCurrentSlide(currentSlide === 5 ? 1 : (prev) => prev + 1);
    }, 4000);
  }, [currentSlide]);

  return (
    <div>
      {!user?.result && (
        <div className="container-slider">
          {sliderItems.map((item, index) => (
            <div
              key={index.id}
              className={
                currentSlide === index + 1 ? "slide active-anim" : "slide"
              }
            >
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
