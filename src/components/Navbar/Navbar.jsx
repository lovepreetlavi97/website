import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchText, setSearchText] = useState('Search for Jewelry');
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const searchPhrases = [
    'Search for Jewelry',
    'Find Your Luxury',
    'Explore Exclusive Pieces',
    'Discover Gold and Silver Treasures',
    'Shop the Best in Gold Jewelry',
    'Luxury That Lasts a Lifetime',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * searchPhrases.length);
      setSearchText(searchPhrases[randomIndex]);
      setAnimationTrigger(true);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleFocus = () => {
    if (searchText === 'Search for Jewelry') {
      setSearchText('');
    }
  };

  const handleBlur = () => {
    if (searchText === '') {
      setSearchText('Search for Jewelry');
    }
  };

  return (
    <header className="navbar px-5 py-3">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <h1 className="brand-title">Jewellers</h1>
          </Link>
        </div>
        {/* Search Bar Section */}
        <div className="search-container">
          <input
            type="text"
            className={`search-input ${animationTrigger ? 'animate-text' : ''}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onAnimationEnd={() => setAnimationTrigger(false)}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Right Links Section */}
        <div className="right-links">
        <Link to="/account" className="orders-link">
            <i className="fas fa-box"></i>
            <span className="link-text">Account</span>
          </Link>
          <Link to="/wishlist" className="wishlist-link">
            <i className="fas fa-heart"></i>
            <span className="link-text">Wishlist</span>
          </Link>
          <Link to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            <span className="link-text">Cart</span>
          </Link>
   
        </div>
      </div>
    </header>
  );
};

export default Navbar;
