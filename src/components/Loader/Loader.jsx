import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import "./Loader.css"; // Import external CSS

const Loader = () => {
  return (
    <div className="loader-overlay">
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <div className="loader-spinner"></div>
      </motion.div>
      <motion.h1
        className="loader-text"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.h1>
    </div>
  );
};

export default Loader;
