import React, { useState } from 'react';
import './CardsListing.css';
import qwerty from '../../assets/images/qwerty.jpg';

const CardsListing = () => {
  const [wishlist, setWishlist] = useState([]); // Wishlist state

  const products = [
    {
      id: 1,
      name: 'Elegant Gold Necklace',
      price: '$1,200',
      image: 'gold-necklace.jpg',
      description: 'A stunning gold necklace perfect for any occasion.',
    },
    {
      id: 2,
      name: 'Silver Bracelet',
      price: '$300',
      image: 'silver-bracelet.jpg',
      description: 'A stylish silver bracelet with intricate detailing.',
    },
    {
      id: 3,
      name: 'Gold Earrings',
      price: '$450',
      image: 'gold-earrings.jpg',
      description: 'Beautiful gold earrings that add charm to your attire.',
    },
    {
      id: 4,
      name: 'Silver Pendant',
      price: '$250',
      image: 'silver-pendant.jpg',
      description: 'A sleek silver pendant with an elegant design.',
    },
  ];

  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((item) => item !== id) // Remove from wishlist
        : [...prevWishlist, id] // Add to wishlist
    );
  };

  return (
    <div className="cards-listing">
      <h2 className="heading">Our Collection</h2>
      <div className="cards-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <div
              className={`wishlist-icon ${
                wishlist.includes(product.id) ? 'active' : ''
              }`}
              onClick={() => toggleWishlist(product.id)}
            >
              <i
                className={`fa-heart ${
                  wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'
                }`}
              ></i>
            </div>
            <img src={qwerty} alt={product.name} className="card-image" />
            <h3 className="card-title">{product.name}</h3>
            <p className="card-description">{product.description}</p>
            <div className="card-footer">
              <span className="card-price">{product.price}</span>
              <button className="card-button">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsListing;
