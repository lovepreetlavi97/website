// Homepage.js
import React from 'react';
import SliderComponent from '../Slider/SliderComponent';
import JewelryCategoriesComponent from '../JewelryCategories/JewelryCategoriesComponent';
import FestivalComponent from '../Festival/FestivalComponent';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <SliderComponent />
      <JewelryCategoriesComponent />
      <FestivalComponent />
    </div>
  );
};

export default Homepage;
