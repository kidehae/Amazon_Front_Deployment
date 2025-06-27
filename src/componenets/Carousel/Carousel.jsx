import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import classes from "./Carousel.module.css";

import { img } from "./img/data";

function MyCarousel() {
  // Changed name to avoid conflict with imported Carousel
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false} // Fixed: 'True' should be 'true' (JavaScript is case-sensitive)
      >
        {img.map((imageItemLink) => {
          // Fixed: map uses parentheses () not curly braces {}
          return <img src={imageItemLink} key={imageItemLink} alt="carousel" />; // Added key and alt props
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default MyCarousel; // Changed to match the component name
