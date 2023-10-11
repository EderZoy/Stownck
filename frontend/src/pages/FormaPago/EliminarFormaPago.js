import React from "react";
import Modal from "react-modal";
import imgDelete from "../../images/delete.png";

const ConfirmDeleteModal = ({
  isOpen,
  onRequestClose,
  onDeleteConfirm,
  formaPago,
}) => {
  const handleConfirm = () => {
    console.log("Confirmación de eliminación ejecutada");
    onDeleteConfirm(formaPago.id);
    onRequestClose();
  };

  // Verificar si el tipoProducto es nulo o indefinido antes de acceder a sus propiedades
  if (!formaPago || !formaPago.nombre) {
    return <p>Error: No se pudo cargar la información de la forma de pago.</p>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmar Eliminación"
      className="bg-[#eaeaea] p-6  rounded-xl mx-[450px] justify-center items-center py-4 mt-36"
    >
      <h2 className="text-2xl font-semibold text-center mt-6">
        Eliminar Forma de Pago
      </h2>
      <img src={imgDelete} alt="delete" className="mx-auto w-28 mb-4 mt-4" />
      <p className="text-xl font-base text-center my-10">
        ¿Estás seguro de que deseas eliminar la forma de pago{" "}
        <span className="font-semibold"> {formaPago.nombre}</span>?
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
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
