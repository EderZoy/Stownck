import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProductoModal = ({ isOpen, onRequestClose, producto }) => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    console.log("Buscar producto");
    onRequestClose();
    // Redirigir después de actualizar exitosamente
    navigate("/principal");
  };

  // Verificar si el Producto es nulo o indefinido antes de acceder a sus propiedades
  if (!producto || !producto.nombre) {
    return <p>Error: No se pudo cargar la información del producto.</p>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmar Eliminación"
      className="bg-[#c6c6c6] p-6  rounded-xl mx-[450px] justify-center items-center py-4 mt-36 border-2 border-black"
    >
      <h2 className="text-2xl font-semibold text-center mt-6 mb-6">
        Producto: "{producto.nombre}"
      </h2>

      <div className="text-xl mx-3">
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Código: </p>
            <p className="font-semibold text-cyan-800">{producto.codigo}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Cantidad: </p>
            <p className="font-semibold text-black">{producto.cantidad}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Medida: </p>
            <p className="font-semibold text-black">{producto.medida}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Precio de Venta: </p>
            <p className="font-semibold text-black">{producto.precioVenta}</p>
          </div>
        </p>
      </div>

      <div className="flex flex-row mt-8 justify-between items-center">
        <button
          onClick={handleConfirm}
          className="p-2 bg-slate-700 text-white font-bold rounded hover:bg-slate-400 focus:outline-none w-full mx-3 mb-6"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ProductoModal;
