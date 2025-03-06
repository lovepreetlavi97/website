import React, { useState, useEffect } from 'react';
import './CardsListing.css';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { getProducts } from "../../api/productAPI";
import { motion } from "framer-motion";

const CardsListing = () => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [imageIndex, setImageIndex] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => {
        const productIds = Object.keys(prevIndex);
        if (productIds.length > 0) {
          const randomProductId = productIds[Math.floor(Math.random() * productIds.length)];
          const newIndex = { ...prevIndex };
          const totalImages = products.find(product => product.id === randomProductId)?.images.length || 0;
          if (totalImages > 1) {
            newIndex[randomProductId] = (prevIndex[randomProductId] + 1) % totalImages;
          }
          return newIndex;
        }
        return prevIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      const initialIndexes = response.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setImageIndex(initialIndexes);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((item) => item !== id)
        : [...prevWishlist, id]
    );
  };

  return (
    <div className="cards-listing">
      <h2 className="heading">Our Premium Collection</h2>
      <motion.div 
        className="cards-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            className="card luxury-card"
            whileHover={{ scale: 1.08, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`wishlist-icon ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <i
                className={`fa-heart ${wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'}`}
              ></i>
            </div>
            <div className="card-images">
              {product.images && product.images.length > 0 && (
                <motion.img
                  src={product.images[imageIndex[product.id] ?? 0]}
                  alt={product.name}
                  className="card-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                />
              )}
            </div>
            <h3 className="card-title luxury-title">{product.name}</h3>
            <div className="card-footer">
              <span className="card-price luxury-price">${product.price}</span>
              <Stack spacing={1} className="rating-container">
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating || 4.5}
                  precision={0.5}
                  readOnly
                  sx={{ color: "#D4AF37" }}
                />
              </Stack>
              <motion.button 
                className="card-button luxury-button" 
                whileHover={{ scale: 1.15, backgroundColor: "#D4AF37", color: "#fff" }}
                transition={{ duration: 0.3 }}
              >
                Add To Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CardsListing;