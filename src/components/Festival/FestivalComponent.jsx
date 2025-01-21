// FestivalComponent.js
import React from 'react';
import './FestivalComponent.css';
import new4 from '../../assets/images/new4.jpg';
import qwert from '../../assets/images/qwert.jpg';

const FestivalComponent = () => {
  const festivals = [
    { name: 'Diwali', img: qwert },
    { name: 'Eid', img: new4 },
  ];

  return (
    <div className="festival-section">
      <h2 className="section-title">Festival Collection</h2>
      <div className="festival-cards">
        {festivals.map((festival, index) => (
          <div key={index} className="festival-card">
            <img src={festival.img} alt={festival.name} />
            <p>{festival.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalComponent;
