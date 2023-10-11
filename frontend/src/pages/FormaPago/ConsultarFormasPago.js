/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obtenerFormasPago from "../../service/RequestFormaPago/RequestGetFormaPago";
import eliminarFormaPago from "../../service/RequestFormaPago/RequestDeleteFormaPago";
import ConfirmDeleteModal from "./EliminarFormaPago";
// import EditarTipoProducto from "./EditarTipoProducto";
import * as FaIcons from "react-icons/fa";

const ConsultarFormaPago = () => {
  const [formasPago, setFormasPago] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // función para obtener los tipos de productos del servidor
  const fetchData = async () => {
    try {
      const formasPagoData = await obtenerFormasPago({
        currentPage,
      });

      // Ordenar tipos de productos por ID de menor a mayor
      const Ordenados = formasPagoData.formaPagos.sort((a, b) => a.id - b.id);

      setFormasPago(Ordenados);
      setTotalPages(formasPagoData.totalPages);

      setFormasPago(formasPagoData.formaPagos);
      setTotalPages(formasPagoData.totalPages);
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
    return <p>Cargando formas de pago...</p>;
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

  // Filtra los tipos de productos según el término de búsqueda
  const formasPagoFiltrados = formasPago.filter((forma) =>
    forma.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (formaPago) => {
    console.log("Botón de eliminar clickeado. Forma de pago:", formaPago);
    setSelectedFormaPago(formaPago);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (formaPagoId) => {
    try {
      console.log("Eliminar forma pago con ID:", formaPagoId);
      // Realizar la solicitud para eliminar el tipo de producto
      await eliminarFormaPago(formaPagoId);
      // Cerrar el modal después de la eliminación
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la forma de pago", error);
      // Manejar el error, por ejemplo, mostrar una notificación al usuario
    }
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Formas de Pago</h1>
          <Link
            to="/registrar-formapago"
            className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#c3eeeb] focus:outline-none w-44 text-center"
          >
            Añadir
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3 mt-3">
          <input
            type="text"
            placeholder="Buscar Tipo de Producto"
            className="p-2 border border-gray-300 rounded focus:outline-none w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabla de tipos de productos */}
        <div className="h-[330px] bg-gray-50">
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2">Nro.</th>
                <th className="border-b p-2">Nombre</th>
                <th className="border-b p-2">Descripción</th>
                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formasPagoFiltrados.map((formapago) => (
                <tr key={formapago.id}>
                  <td className="border-b p-2 text-center">{formapago.id}</td>
                  <td className="border-b p-2 text-start">
                    {formapago.nombre}
                  </td>
                  <td className="border-b p-2 text-center">
                    {formapago.descripcion}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex flex-row justify-center">
                      <Link
                        to={`/editar-formapago/${formapago.id}`} // Ajusta la ruta según tu estructura de navegación
                        className="text-black hover:underline hover:text-emerald-500 text-center mx-2"
                      >
                        <FaIcons.FaPencilAlt></FaIcons.FaPencilAlt>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(formapago)}
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

        {/* Modal de confirmación de eliminación */}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onDeleteConfirm={handleDeleteConfirm}
            formaPago={selectedFormaPago}
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

export default ConsultarFormaPago;
