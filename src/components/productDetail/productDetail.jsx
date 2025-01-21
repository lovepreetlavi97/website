import React from 'react';
import './productDetail.css'; // Make sure to style the product detail page properly.

const ProductDetail = ({ product, onClose }) => {
  return (
    <div className="product-detail-modal">
      <div className="product-detail-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-rating">
              <span>{product.rating} ⭐</span>
              <span>({product.reviews} reviews)</span>
            </div>
            <div className="product-price">
              ₹{product.price}
              {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
