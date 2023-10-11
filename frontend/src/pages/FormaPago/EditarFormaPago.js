/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import obtenerFormaPagoPorId from "../../service/RequestFormaPago/RequestGetFormaPagoId";
import actualizarFormaPago from "../../service/RequestFormaPago/RequestPutFormaPago";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarFormaPago = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormaPago = async () => {
      try {
        const formaPagoData = await obtenerFormaPagoPorId(id);
        setNombre(formaPagoData.nombre);
        setDescripcion(formaPagoData.descripcion);
      } catch (error) {
        console.error("Error al obtener la forma de pago", error);
      }
    };

    fetchFormaPago();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de campos
      if (!nombre) {
        setError("El nombre es obligatorio");
        return;
      }

      // Enviar solicitud para actualizar el tipo de producto
      await actualizarFormaPago(id, { nombre, descripcion });

      // Muestra la notificación de éxito
      toast.success(`Forma de Pago ${nombre} actualizado con éxito!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Espera 3 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Redirigir después de actualizar exitosamente
      navigate("/consultar-formaspago");
    } catch (error) {
      setError("Error al actualizar la forma de pago");
    }
  };

  return (
    <div className="w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-96">
        <div className="flex flex-row p-1 justify-center items-center mb-2">
          <h1 className="text-3xl font-semibold">Editar Forma de Pago</h1>
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
              onClick={() => navigate("/consultar-formaspago")}
              className="p-2  bg-slate-700 text-white font-bold rounded hover:bg-slate-400  focus:outline-none w-full mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#b2e4e1] focus:outline-none w-full ml-4"
            >
              Actualizar
            </button>

            {/* Componente de contenedor de notificaciones */}
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarFormaPago;
