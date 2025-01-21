import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Tagline */}
        <div className="footer-logo">
          <h2>Guru Jewellers</h2>
          <p>Where Elegance Meets Craftsmanship</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <a href="https://www.instagram.com/guru_jewellers1/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Bottom Section */}

    </footer>
  );
};

export default Footer;
