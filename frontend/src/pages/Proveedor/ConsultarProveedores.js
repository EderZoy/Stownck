/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obtenerProveedor from "../../service/RequestProveedor/RequestGetProveedor";
import eliminarProveedor from "../../service/RequestProveedor/RequestDeleteProveedor";
import ConfirmDeleteModal from "./EliminarProveedor";
// import EditarTipoProducto from "./EditarTipoProducto";
import * as FaIcons from "react-icons/fa";

const ConsultarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // función para obtener los tipos de productos del servidor
  const fetchData = async () => {
    try {
      const proveedoresData = await obtenerProveedor({
        currentPage,
      });

      // Ordenar tipos de productos por ID de menor a mayor
      const Ordenados = proveedoresData.proveedores.sort((a, b) => a.id - b.id);

      setProveedores(Ordenados);
      setTotalPages(proveedoresData.totalPages);

      setProveedores(proveedoresData.proveedores);
      setTotalPages(proveedoresData.totalPages);
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
    return <p>Cargando proveedores...</p>;
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
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (proveedor) => {
    console.log("Botón de eliminar clickeado. Proveedor:", proveedor);
    setSelectedProveedor(proveedor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (proveedorId) => {
    try {
      console.log("Eliminar proveedor con ID:", proveedorId);
      // Realizar la solicitud para eliminar el tipo de producto
      await eliminarProveedor(proveedorId);
      // Cerrar el modal después de la eliminación
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el proveedor", error);
      // Manejar el error, por ejemplo, mostrar una notificación al usuario
    }
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Proveedores</h1>
          <Link
            to="/registrar-proveedor"
            className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#c3eeeb] focus:outline-none w-44 text-center"
          >
            Añadir
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3 mt-3">
          <input
            type="text"
            placeholder="Buscar Proveedor"
            className="p-2 border border-gray-300 rounded focus:outline-none w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabla de proveedores */}
        <div className="h-[330px] bg-gray-50">
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2">Nro.</th>
                <th className="border-b p-2">Nombre</th>
                <th className="border-b p-2">Descripción</th>
                <th className="border-b p-2">Teléfono</th>
                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td className="border-b p-2 text-center">{proveedor.id}</td>
                  <td className="border-b p-2 text-start">
                    {proveedor.nombre}
                  </td>
                  <td className="border-b p-2 text-center">
                    {proveedor.descripcion}
                  </td>
                  <td className="border-b p-2 text-center">
                    {proveedor.telefono}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex flex-row justify-center">
                      <Link
                        to={`/editar-proveedor/${proveedor.id}`} // Ajusta la ruta según tu estructura de navegación
                        className="text-black hover:underline hover:text-emerald-500 text-center mx-2"
                      >
                        <FaIcons.FaPencilAlt></FaIcons.FaPencilAlt>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(proveedor)}
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
            proveedor={selectedProveedor}
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

export default ConsultarProveedor;
