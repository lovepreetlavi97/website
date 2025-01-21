import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const HomePage = lazy(() => import('../components/Home/Homepage'));
const CartPage = lazy(() => import('../components/Cart/CartItem'));
const WishListPage = lazy(() => import('../components/Wishlist/Wishlist'));
const Account = lazy(() => import('../components/User/UserAccount'));
const Login = lazy(() => import('../components/Login/Login'));
const CardsListing = lazy(() =>
	import("../components/CardsListing/CardsListing")
);
const CardsListing1 = lazy(() =>
	import("../components/CardsListing1/CardsListing1")
);
const ProductDetail = lazy(() =>
	import("../components/productDetail/productDetail")
);
const VerifyOtp = lazy(() => import('../components/VerifyOTP/VerifyOtp'));
const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp  />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cards-listing" element={<CardsListing />} />
        <Route path="/cards-listing1" element={<CardsListing1 />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
