import React, { useState } from "react";
import backgroundImage from "../images/fononegro.png"; // Ruta a tu imagen de fondo
import logo from "../images/logo.png";
import authenticate from "../service/RequestUsuario";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { useAuth } from "../context/AuthProvider";

export const obtenerUsuario = () => {
  return LoginScreen.obtenerUsuario();
};

const LoginScreen = () => {
  const [nombre, setUsername] = useState("");
  const [contraseña, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { login } = useAuth(); // Usa el contexto de autenticación

  // eslint-disable-next-line no-unused-vars
  const obtenerUsuario = () => {
    return nombre;
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !contraseña) {
      setError("Por favor, complete ambos campos.");
      return;
    }

    try {
      const response = await authenticate(nombre, contraseña);
      console.log(response);
      // Verificar la respuesta del servidor
      if (response === 200) {
        login(localStorage.getItem("token"));
        // Usuario autenticado, realizar acciones necesarias (por ejemplo, redireccionar a otra página)
        console.log("Usuario autenticado");

        // Redirigir al usuario a la página de dashboard
        updateUser(nombre);
        navigate("/principal");
      } else {
        setError("Nombre de usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      setError(
        "Error al intentar iniciar sesión. Por favor, inténtelo de nuevo."
      );
    }
  };

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
            ¡BIENVENIDO A STOWNCK!
          </h2>
          <h2 className="text-lg font-semibold mb-4 text-center text-[#4F706E] ">
            Sistema de gestión de Town Store!
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-600"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={handleUsernameChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-600"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="contraseña"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingrese su contraseña"
                  name="contraseña"
                  value={contraseña}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="mr-2 p-2 absolute top-0 right-0 rounded-md"
                  onClick={handleTogglePasswordVisibility}
                >
                  {passwordVisible ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex items-center justify-center">
              <button
                className="bg-[#7BBBB7] text-black text-center font-bold p-2 rounded-md hover:bg-blue-600 w-40"
                onClick={handleSubmit}
              >
                Ingresar
              </button>
            </div>
            <h2 className="text-sm font-semibold mb-4 mt-4 text-center text-black ">
              Si no tenes cuenta comunicate con el administrador para generarla
            </h2>
            <div className="flex item-center justify-center">
              <button className="text-sm font-semibold item-center text-[#20817a] underline hover:text-emerald-400">
                Recuperar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
