import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import imgDelete from "../../images/delete.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmDeleteModal = ({
  isOpen,
  onRequestClose,
  onDeleteConfirm,
  producto,
}) => {
  const navigate = useNavigate();
  const handleConfirm = async () => {
    console.log("Confirmación de eliminación ejecutada");
    onDeleteConfirm(producto.id);

    // Muestra la notificación de éxito
    toast.info(`Producto eliminado con éxito!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Espera 3 segundos antes de redirigir
    await new Promise((resolve) => setTimeout(resolve, 3000));
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
      className="bg-[#eaeaea] p-6  rounded-xl mx-[450px] justify-center items-center py-4 mt-36"
    >
      <h2 className="text-2xl font-semibold text-center mt-6">
        Eliminar Producto
      </h2>
      <img
        src={imgDelete}
        alt="Logo de la empresa"
        className="mx-auto w-28 mb-4 mt-4"
      />
      <p className="text-xl font-base text-center my-10">
        ¿Estás seguro de que deseas eliminar el producto{" "}
        <span className="font-semibold"> {producto.nombre}</span>?
      </p>
      <div className="flex flex-row mt-4 justify-between items-center">
        <button
          onClick={onRequestClose}
          className="p-2  bg-slate-700 text-white font-bold rounded hover:bg-slate-400  focus:outline-none w-full mr-4"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="p-2 bg-red-500 text-black font-bold rounded hover:bg-red-700 focus:outline-none w-full ml-4"
        >
          Eliminar
        </button>

        {/* Componente de contenedor de notificaciones */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
