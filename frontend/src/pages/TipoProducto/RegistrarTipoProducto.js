import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestPostTipoProducto from "../../service/RequestPostTipoProducto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgregarTipoProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de campos
      if (!nombre) {
        setError("El nombre es obligatorio");
        return;
      }

      // Enviar solicitud para crear el tipo de producto
      await RequestPostTipoProducto({ nombre, descripcion });

      // Muestra la notificación de éxito
      toast.success(`Tipo de producto ${nombre} registrado con exito!`, {
        position: "top-right",
        autoClose: 3000, // Cierra la notificación automáticamente después de 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirigir después de agregar exitosamente
      // navigate("/consultar-tiposproductos"); // Cambia "/consultar" por la ruta que corresponda
      // Limpia los campos del formulario
      setNombre("");
      setDescripcion("");
    } catch (error) {
      setError("Error al agregar el tipo de producto");
    }
  };

  return (
    <div className="w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-96">
        <div className="flex flex-row p-1 justify-center items-center mb-2">
          <h1 className="text-3xl font-semibold">Registrar Tipo de Producto</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-lg font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-lg font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
            ></textarea>
          </div>

          {error && <p className="text-red-500 font-bold">{error}</p>}

          <div className="flex flex-row mt-4 justify-between items-center">
            <button
              onClick={() => {
                navigate("/consultar-tiposproductos");
              }}
              className="p-2  bg-slate-700 text-white font-bold rounded hover:bg-slate-400  focus:outline-none w-full mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#b2e4e1] focus:outline-none w-full ml-4"
            >
              Registrar
            </button>

            {/* Componente de contenedor de notificaciones */}
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarTipoProducto;
