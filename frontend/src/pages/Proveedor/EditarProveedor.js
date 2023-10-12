import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import obtenerProveedorPorId from "../../service/RequestProveedor/RequestGetProveedorId";
import actualizarProveedor from "../../service/RequestProveedor/RequestPutProveedor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditarProveedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const proveedorData = await obtenerProveedorPorId(id);
        setNombre(proveedorData.nombre);
        setTelefono(proveedorData.telefono);
        setDescripcion(proveedorData.descripcion);
      } catch (error) {
        console.error("Error al obtener el proveedor", error);
      }
    };

    fetchProveedor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de campos
      setError("");

      if (!nombre) {
        setError("El nombre es obligatorio");
        return;
      }

      // Enviar solicitud para actualizar el proveedor
      await actualizarProveedor(id, { nombre, descripcion, telefono });

      // Muestra la notificación de éxito
      toast.success(`Proveedor ${nombre} actualizado con éxito!`, {
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
      navigate("/consultar-proveedores");
    } catch (error) {
      setError("Error al actualizar el proveedor44");
    }
  };

  return (
    <div className="w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-96">
        <div className="flex flex-row p-1 justify-center items-center mb-2">
          <h1 className="text-3xl font-semibold">Editar Proveedor</h1>
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
              htmlFor="telefono"
              className="block text-lg font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
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
              onClick={() => navigate("/consultar-proveedores")}
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

export default EditarProveedor;
