import React, { useState } from 'react';
import '../Cart/CartItem.css';

const CartPage = () => {
  const initialCartItems = [
    {
      id: 1,
      name: 'Gold Necklace',
      price: 2500,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Silver Earrings',
      price: 800,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 2,
    },
    {
      id: 1,
      name: 'Gold Necklace',
      price: 2500,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Silver Earrings',
      price: 800,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 2,
    },
    {
      id: 1,
      name: 'Gold Necklace',
      price: 2500,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Silver Earrings',
      price: 800,
      image: 'https://i.ytimg.com/vi/VD0BPupbxeg/maxresdefault.jpg',
      quantity: 2,
    },
    // Add more items as necessary
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Increase item quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Price: ₹{item.price.toLocaleString()}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <p>Total: ₹{(item.price * item.quantity).toLocaleString()}</p>
              <button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ₹{calculateTotal().toLocaleString()}</p>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
