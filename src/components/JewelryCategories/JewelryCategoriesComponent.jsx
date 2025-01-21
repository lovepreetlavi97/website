// JewelryCategoriesComponent.js
import React from 'react';
import './JewelryCategoriesComponent.css';
import qwerty from '../../assets/images/qwerty.jpg';
import qwertyu from '../../assets/images/qwertyu.jpg';
import qwertyui from '../../assets/images/qwertyui.jpg';

const JewelryCategoriesComponent = () => {
  const jewelryCategories = [
    { name: 'Necklaces', img: qwerty },
    { name: 'Rings', img: qwertyu },
    { name: 'Pendants', img: qwertyui },
    { name: 'Kadas', img: qwerty },
  ];

  return (
    <div className="jewelry-categories">
      <h2 className="section-title">Explore Our Collection</h2>
      <div className="category-cards">
        {jewelryCategories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.img} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelryCategoriesComponent;
