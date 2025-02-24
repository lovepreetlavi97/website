import React, { createContext, useContext, useState } from "react";
import Loader from "../components/Loader/Loader"; // Adjust path if needed

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />} {/* Show loader when loading is true */}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
