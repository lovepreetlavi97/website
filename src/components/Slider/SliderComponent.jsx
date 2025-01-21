// SliderComponent.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import './SliderComponent.css';
import qwert from '../../assets/images/qwert.jpg';
import qwerty from '../../assets/images/qwerty.jpg';
import qwertyu from '../../assets/images/qwertyu.jpg';
import qwertyui from '../../assets/images/qwertyui.jpg';

const SliderComponent = () => {
  const [sliderImages] = useState([
    qwert, qwerty, qwertyu, qwertyui, qwert, // Add more images as needed
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderImages.map((img, index) => (
          <div key={index} className="slider-item">
            <img src={img} alt={`Slider Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
