/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obtenerCompras from "../../service/RequestCompra/RequestGetCompras";
import eliminarCompra from "../../service/RequestCompra/RequestDeleteCompra";
import ConfirmDeleteModal from "./EliminarCompra";
import obtenerProveedores from "../../service/RequestProveedor/RequestProveedores";
import obtenerUsuarios from "../../service/RequestUsuarios/RequestResponsables";
import * as FaIcons from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConsultarCompra from "./ConsultarCompra";

const ConsultarCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState(null);
  const [isConsultaModalOpen, setIsConsultaModalOpen] = useState(false);

  // función para obtener los productos del servidor
  const fetchData = async () => {
    try {
      const comprasData = await obtenerCompras({
        currentPage,
      });

      // Obtener proveedores
      const proveedores = await obtenerProveedores(); // Reemplaza con la función correcta para obtener tipos
      setProveedores(proveedores); // Actualiza el estado de proveedores

      // Obtener usuarios
      const responsables = await obtenerUsuarios(); // Reemplaza con la función correcta para obtener tipos
      setResponsables(responsables); // Actualiza el estado de responsables

      setCompras(comprasData.compras);
      setTotalPages(comprasData.totalPages);
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
    return <p>Cargando compras...</p>;
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

  // Filtra las compras según el término de búsqueda
  const comprasFiltradas = compras.filter((compra) => {
    const cumpleFiltroProveedor =
      !selectedProveedor || compra.Proveedor.nombre === selectedProveedor;
    const cumpleFiltroResponsable =
      !selectedResponsable || compra.Usuario.nombre === selectedResponsable;

    // Convierte la fecha de compra a un formato comparable (asegúrate de ajustar esto a tu lógica de fecha)
    const fechaCompra = new Date(compra.fechaCompra);
    const cumpleFiltroFecha =
      !selectedFecha ||
      fechaCompra.toDateString() === selectedFecha.toDateString();

    return (
      cumpleFiltroProveedor && cumpleFiltroResponsable && cumpleFiltroFecha
    );
  });

  const handleDeleteClick = (compra) => {
    console.log("Botón de eliminar clickeado. Compra:", compra);
    setSelectedCompra(compra);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (compraId) => {
    try {
      console.log("Eliminar compra con ID:", compraId);
      // Realizar la solicitud para eliminar el producto
      await eliminarCompra(compraId);
      // Cerrar el modal después de la eliminación
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la compra", error);
      // Manejar el error, por ejemplo, mostrar una notificación al usuario
    }
  };

  const handleClearFilter = () => {
    setSelectedProveedor(""); // Establecer tipo de producto en null
    setSelectedFecha(""); // Establecer tipo de producto en null
    setSelectedResponsable("");
  };

  const handleConsultCompra = (compra) => {
    setSelectedCompra(compra);
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
          <h1 className="text-3xl font-semibold">Compras</h1>
          <Link
            to="/registrar-compra"
            className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#c3eeeb] focus:outline-none w-44 text-center"
          >
            Nueva Compra
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
            value={selectedProveedor}
            onChange={(e) => setSelectedProveedor(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none w-64 px-3 mr-4"
            placeholder="Proveedir"
          >
            <option value="">Proveedores</option>
            {proveedores.map((tipo) => (
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

        {/* Tabla de compras */}
        <div className="h-[380px] bg-gray-50">
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2">Fecha</th>
                <th className="border-b p-2">Proveedor</th>
                <th className="border-b p-2">Responsable</th>
                <th className="border-b p-2">Total Compra</th>

                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {comprasFiltradas.map((compra) => (
                <tr key={compra.id}>
                  <td className="border-b p-2 text-center font-semibold">
                    {formatDate(compra.fechaCompra)}
                  </td>
                  <td className="border-b p-2 text-center">
                    {compra.Proveedor && compra.Proveedor.nombre
                      ? compra.Proveedor.nombre
                      : "-"}
                  </td>
                  <td className="border-b p-2 text-center">
                    {compra.Usuario && compra.Usuario.nombre
                      ? compra.Usuario.nombre
                      : "-"}
                  </td>

                  <td className="border-b p-2 text-center font-semibold">
                    ${compra.total}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex flex-row justify-center">
                      <button
                        onClick={() => handleConsultCompra(compra)}
                        className="hover:underline text-sky-950 hover:text-sky-800 mx-2 text-center"
                      >
                        <FaIcons.FaSearch></FaIcons.FaSearch>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(compra)}
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
          <ConsultarCompra
            isOpen={isConsultaModalOpen}
            onRequestClose={() => setIsConsultaModalOpen(false)}
            compra={selectedCompra}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onDeleteConfirm={handleDeleteConfirm}
            compra={selectedCompra}
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

export default ConsultarCompras;
