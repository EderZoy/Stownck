/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obtenerVentas from "../../service/RequestVenta/RequestGetVentas";
import eliminarVenta from "../../service/RequestVenta/RequestDeleteVenta";
import ConfirmDeleteModal from "./EliminarVenta";
import obtenerFormasPago from "../../service/RequestFormaPago/RequestFormasPago";
import obtenerUsuarios from "../../service/RequestUsuarios/RequestResponsables";
import * as FaIcons from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConsultarVenta from "./ConsultarVenta";

const ConsultarVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [formasPago, setFormasPago] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState(null);
  const [isConsultaModalOpen, setIsConsultaModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const ventasData = await obtenerVentas({
        currentPage,
      });

      // Obtener formas de pago
      const formasPago = await obtenerFormasPago();
      setFormasPago(formasPago); // Actualiza el estado de formas de pago

      // Obtener usuarios
      const responsables = await obtenerUsuarios();
      setResponsables(responsables); // Actualiza el estado de responsables

      setVentas(ventasData.ventas);
      setTotalPages(ventasData.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, isDeleteModalOpen]);

  if (loading) {
    return <p>Cargando ventas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Filtra las ventas según el término de búsqueda
  const ventasFiltradas = ventas.filter((venta) => {
    const cumpleFiltroFormaPago =
      !selectedFormaPago || venta.FormaPago.nombre === selectedFormaPago;
    const cumpleFiltroResponsable =
      !selectedResponsable || venta.Usuario.nombre === selectedResponsable;

    // Convierte la fecha de venta a un formato comparable (asegúrate de ajustar esto a tu lógica de fecha)
    const fechaVenta = new Date(venta.fechaVenta);
    const cumpleFiltroFecha =
      !selectedFecha ||
      fechaVenta.toDateString() === selectedFecha.toDateString();

    return (
      cumpleFiltroFormaPago && cumpleFiltroResponsable && cumpleFiltroFecha
    );
  });

  const handleDeleteClick = (venta) => {
    console.log("Botón de eliminar clickeado. Venta:", venta);
    setSelectedVenta(venta);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (ventaId) => {
    try {
      console.log("Eliminar Venta con ID:", ventaId);
      // Realizar la solicitud para eliminar la venta
      await eliminarVenta(ventaId);
      // Cerrar el modal después de la eliminación
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la venta", error);
    }
  };

  const handleClearFilter = () => {
    setSelectedFormaPago("");
    setSelectedFecha("");
    setSelectedResponsable("");
  };

  const handleConsultVenta = (venta) => {
    setSelectedVenta(venta);
    setIsConsultaModalOpen(true);
  };

  const formatDate = (fecha) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = new Date(fecha).toLocaleDateString(
      undefined,
      options
    );
    return fechaFormateada;
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Ventas</h1>
          <Link
            to="/registrar-venta"
            className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#c3eeeb] focus:outline-none w-44 text-center"
          >
            Nueva Venta
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3 mt-3 flex flex-row">
          <select
            value={selectedResponsable}
            onChange={(e) => setSelectedResponsable(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none w-64 px-3 mr-4"
            placeholder="Responsable"
          >
            <option value="">Responsables</option>
            {responsables.map((tipo) => (
              <option key={tipo.id} value={tipo.nombre}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          <select
            value={selectedFormaPago}
            onChange={(e) => setSelectedFormaPago(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none w-64 px-3 mr-4"
            placeholder="Forma Pago"
          >
            <option value="">Formas Pago</option>
            {formasPago.map((tipo) => (
              <option key={tipo.id} value={tipo.nombre}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          {/* Selector de fechas */}
          <DatePicker
            selected={selectedFecha}
            onChange={(date) => setSelectedFecha(date)}
            placeholderText="Seleccionar fecha"
            className="p-2 border border-gray-300 rounded focus:outline-none w-48 px-3"
          />
          <button
            onClick={() => handleClearFilter()}
            className="p-2 border border-gray-300 bg-slate-400 rounded focus:outline-none ml-7 w-44 font-semibold"
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Tabla de ventas */}
        <div className="h-[380px] bg-gray-50">
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2">Nro</th>
                <th className="border-b p-2">Fecha</th>
                <th className="border-b p-2">Cliente</th>
                <th className="border-b p-2">Tipo de Pago</th>
                <th className="border-b p-2">Responsable</th>
                <th className="border-b p-2">Monto Total</th>

                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => (
                <tr key={venta.id}>
                  <td className="border-b p-2 text-center font-semibold">
                    {venta.id}
                  </td>
                  <td className="border-b p-2 text-center font-semibold">
                    {formatDate(venta.fechaVenta)}
                  </td>
                  <td className="border-b p-2 text-center font-semibold">
                    {venta.nombreCliente}
                  </td>
                  <td className="border-b p-2 text-center">
                    {venta.FormaPago && venta.FormaPago.nombre
                      ? venta.FormaPago.nombre
                      : "-"}
                  </td>
                  <td className="border-b p-2 text-center">
                    {venta.Usuario && venta.Usuario.nombre
                      ? venta.Usuario.nombre
                      : "-"}
                  </td>

                  <td className="border-b p-2 text-center font-semibold">
                    ${venta.total}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex flex-row justify-center">
                      <button
                        onClick={() => handleConsultVenta(venta)}
                        className="hover:underline text-sky-950 hover:text-sky-800 mx-2 text-center"
                      >
                        <FaIcons.FaSearch></FaIcons.FaSearch>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(venta)}
                        className="text-red-500 hover:underline hover:text-red-700 mx-2 text-center"
                      >
                        <FaIcons.FaTrashAlt></FaIcons.FaTrashAlt>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isConsultaModalOpen && (
          <ConsultarVenta
            isOpen={isConsultaModalOpen}
            onRequestClose={() => setIsConsultaModalOpen(false)}
            venta={selectedVenta}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onDeleteConfirm={handleDeleteConfirm}
            venta={selectedVenta}
          />
        )}

        {/* Paginación */}
        <div
          className="flex justify-center items-end mt-4"
          style={{
            position: "relative",
            bottom: "0px", // Ajusta la distancia desde la parte inferior según sea necesario
            left: "50%", // Ajusta la posición horizontal según sea necesario
            transform: "translateX(-50%)", // Centra el elemento horizontalmente
          }}
        >
          <button
            onClick={handlePrevPage}
            className=" text-black px-4 py-2 rounded mr-10"
            disabled={currentPage === 1}
            style={{
              backgroundColor: currentPage === 1 ? "#7A7A7A" : "#548a87",
            }}
          >
            <FaIcons.FaCaretLeft className="text-2xl"></FaIcons.FaCaretLeft>
          </button>

          <div className="flex">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${
                    page === currentPage ? "bg-[#548a87]" : "bg-gray-300"
                  } text-black px-4 py-2 mx-1 rounded`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={handleNextPage}
            className=" text-black px-4 py-2 rounded ml-10"
            disabled={currentPage === totalPages}
            style={{
              backgroundColor:
                currentPage === totalPages ? "#7A7A7A" : "#548a87",
            }}
          >
            <FaIcons.FaCaretRight className="text-2xl"></FaIcons.FaCaretRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultarVentas;
