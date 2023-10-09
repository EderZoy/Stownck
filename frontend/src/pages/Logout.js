import React, { useEffect } from "react";
import backgroundImage from "../images/fononegro.png"; // Ruta a tu imagen de fondo
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LogoutScreen = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Usa el contexto de autenticación

  useEffect(() => {
    logout();
  });

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="bg-[#D9D9D9] p-8 rounded shadow-md w-96">
          <img
            src={logo}
            alt="Logo de la empresa"
            className="mx-auto w-28 mb-4"
          />
          <h2 className="text-2xl text-center font-bold">
            ¡VUELVE PRONTO A STOWNCK!
          </h2>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#7BBBB7] text-black text-center font-bold p-2 rounded-md hover:bg-blue-600 w-40 my-4"
              onClick={() => navigate("/login")}
            >
              Inicia Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutScreen;
