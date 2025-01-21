import React, { useState } from 'react';
import './CardsListing.css';
import qwertyui from '../../assets/images/qwertyui.jpg';
import ProductDetail from '../productDetail/productDetail'; // Assuming you have this component

const CardsListing = () => {
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for details screen

  const products = [
    {
      id: 1,
      image: qwertyui,
      name: 'Elegance On The Rise',
      rating: 4.7,
      reviews: 51,
      price: 2199,
      originalPrice: 3999,
    },
    {
      id: 2,
      image: qwertyui,
      name: 'Rose Gold Drop',
      rating: 4.8,
      reviews: 204,
      price: 1799,
      originalPrice: 2999,
    },
    {
      id: 3,
      image: qwertyui,
      name: 'Rose Gold Flowing',
      rating: 4.5,
      reviews: 61,
      price: 2099,
      originalPrice: 3799,
    },
    {
      id: 4,
      image: qwertyui,
      name: 'Anushka Sharma Set',
      rating: 4.8,
      reviews: 113,
      price: 2799,
      originalPrice: 4799,
      bestseller: true,
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
    <div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="cards-listing">
        <div className="container">
          <div className="filters">
            <i className="fas fa-filter"></i> Filter
            <i className="fas fa-sort"></i> Featured
          </div>

          <div className="products">
            {products.map((product) => (
              <div className="product" key={product.id} onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <div className="rating">
                    <span>{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                  <div className="price">
                    <span>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <p>{product.name}</p>
                  {product.bestseller && <span className="bestseller-tag">Bestseller</span>}
                </div>
                <button
                  className={`wishlist-btn ${wishlist.includes(product.id) ? 'added' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClick of parent div
                    toggleWishlist(product.id);
                  }}
                >
                  {wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsListing;
