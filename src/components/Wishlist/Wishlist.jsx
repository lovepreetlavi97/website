import React, { useState } from 'react';
import '../Cart/CartItem.css';
import { FaHeart } from 'react-icons/fa';

const WishlistPage = () => {
  const initialWishlistItems = [
    {
      id: 1,
      name: 'Gold Necklace',
      price: 2500,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
    },
    {
      id: 2,
      name: 'Silver Earrings',
      price: 800,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
    },
    {
      id: 3,
      name: 'Diamond Ring',
      price: 5000,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
    },
  ];

  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    console.log(`Item with id ${id} moved to cart.`);
    removeItem(id);
  };

  return (
    <div className="cart-page">
      <h1>Your Wishlist</h1>
      <div className="cart-container">
        {wishlistItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="wishlist-icon">
              <FaHeart size={20} color="#d4af37" />
            </div>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Price: ₹{item.price.toLocaleString()}</p>
              <div className="button-group">
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
                <button
                  className="add-to-cart-button"
                  onClick={() => moveToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishlistItems.length === 0 && (
        <p style={{ textAlign: 'center', color: '#2c3e50' }}>
          Your wishlist is empty.
        </p>
      )}
    </div>
  );
};

export default WishlistPage;
