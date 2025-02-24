import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token); // ✅ Set state on mount
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token); // ✅ Updates immediately
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = !!authToken; // ✅ Ensure it updates on state change

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
