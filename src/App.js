import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Homepage';
import Festival from './components/Festival/FestivalComponent';
import AppRoutes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <Navbar />/
      {/* <Home /> */}
      <AppRoutes />
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
