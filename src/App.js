// App.js (or AppContent.js if you renamed it)
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { LoaderProvider } from "./context/LoaderContext"; // Import LoaderProvider
function AppContent() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, 'isAuthenticated');

  return (
    <div>
         {/* <LoaderProvider> */}
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <AppRoutes />
      {isAuthenticated && <Footer />} {/* Show Footer only if authenticated */}
      <ToastContainer position="top-center" />
      {/* </LoaderProvider> */}
    </div>
  );
}

export default AppContent;  // Default export for AppContent (or App if that’s what you use)
