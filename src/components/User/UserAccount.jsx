import React, { useState } from 'react';
import './UserAccount.css';

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, Springfield, USA',
    orders: [
      { id: 1, item: 'Gold Necklace', date: '2024-01-01', status: 'Delivered' },
      { id: 2, item: 'Silver Earrings', date: '2024-01-10', status: 'Processing' },
    ],
    wishlist: [
      { id: 1, name: 'Gold Necklace', price: 2500 },
      { id: 2, name: 'Diamond Ring', price: 5000 },
    ],
  };

  const tabs = {
    profile: (
      <div>
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
    ),
    orders: (
      <div>
        <h2>Orders</h2>
        <ul>
          {user.orders.map((order) => (
            <li key={order.id}>
              <p><strong>Item:</strong> {order.item}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
    wishlist: (
      <div>
        <h2>Wishlist</h2>
        <ul>
          {user.wishlist.map((item) => (
            <li key={item.id}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ₹{item.price.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
    settings: (
      <div>
        <h2>Settings</h2>
        <p>Manage your account settings here.</p>
      </div>
    ),
  };

  return (
    <div className="user-account">
      <div className="sidebar">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="content">{tabs[activeTab]}</div>
    </div>
  );
};

export default UserAccount;
