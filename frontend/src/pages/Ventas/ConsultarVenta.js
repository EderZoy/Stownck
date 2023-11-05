import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CompraModal = ({ isOpen, onRequestClose, venta }) => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    console.log("Consultar Venta");
    onRequestClose();
    navigate("/consultar-ventas");
  };

  // Verificar si la compra es nulo o indefinido antes de acceder a sus propiedades
  if (!venta) {
    return <p>Error: No se pudo cargar la información de la venta.</p>;
  }

  const formatDate = (fecha) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = new Date(fecha).toLocaleDateString(
      undefined,
      options
    );
    return fechaFormateada;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmar Eliminación"
      className="bg-[#c6c6c6] p-6  rounded-xl mx-[450px] justify-center items-center py-4 mt-10 border-2 border-black"
    >
      <h2 className="text-2xl font-semibold text-center mt-6 mb-6">
        Venta Nro: {venta.id}
      </h2>

      <div className=" text-lg mx-3">
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Fecha: </p>
            <p className="font-semibold text-cyan-800">
              {formatDate(venta.fechaVenta)}
            </p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Cliente: </p>
            <p className="font-semibold text-black">{venta.nombreCliente}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Forma de Pago: </p>
            <p className="font-semibold text-black">{venta.FormaPago.nombre}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Responsable: </p>
            <p className="font-semibold text-black">{venta.Usuario.nombre}</p>
          </div>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm">
          <div className="justify-between flex flex-row">
            <p className="font-bold"> Detalle de Venta: </p>
          </div>
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg mt-2">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2 text-sm">Producto</th>
                <th className="border-b p-2 text-sm">Cantidad</th>
                <th className="border-b p-2 text-sm">Precio</th>
              </tr>
            </thead>
            <tbody>
              {venta.detallesProductoVenta.map((detalle) => (
                <tr key={detalle.id}>
                  <td className="border-b p-2 text-center text-sm">
                    {detalle.Producto.nombre}
                  </td>
                  <td className="border-b p-2 text-center text-sm">
                    {detalle.cantidad}
                  </td>
                  <td className="border-b p-2 text-center text-sm">
                    ${detalle.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </p>
        <p className="mb-2 bg-slate-300 p-1 px-4 rounded-sm font-bold">
          <div className="justify-between flex flex-row">
            <p> Total Venta: </p>
            <p className="font-semibold text-black">${venta.total}</p>
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

export default CompraModal;
