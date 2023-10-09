import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = (ruta, componente) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Route path={ruta} element={componente} />;
};

export default PrivateRoute;
