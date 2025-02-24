import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, "isAuthenticated");  // This should now print either true or false

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <AppRoutes />
      {isAuthenticated && <Footer />}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default AppContent;
