// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Lógica para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return token !== null;
  };

  const login = (newToken) => {
    setToken(newToken);
    console.log(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    // Ejemplo de verificación usando LocalStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contextValue = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
