/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obtenerProductos from "../../service/RequestProducto/RequestGetProducto";
import eliminarProducto from "../../service/RequestProducto/RequestDeleteProducto";
import ConfirmDeleteModal from "./EliminarProducto";
import obtenerTipos from "../../service/RequestTipoProducto/RequestGetTipos";
// import EditarTipoProducto from "./EditarTipoProducto";
import * as FaIcons from "react-icons/fa";

const ConsultarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [tipoProductos, setTiposProductos] = useState([]);

  // función para obtener los productos del servidor
  const fetchData = async () => {
    try {
      const productosData = await obtenerProductos({
        currentPage,
      });

      // Obtener tipos de producto
      const tiposDeProducto = await obtenerTipos(); // Reemplaza con la función correcta para obtener tipos
      setTiposProductos(tiposDeProducto); // Actualiza el estado de tipos de producto

      setProductos(productosData.productos);
      setTotalPages(productosData.totalPages);
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
    return <p>Cargando productos...</p>;
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

  // Filtra los productos según el término de búsqueda
  const productosFiltrados = productos.filter(
    (producto) =>
      (producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedTipo || producto.TipoProducto.nombre === selectedTipo)
  );

  const handleDeleteClick = (producto) => {
    console.log("Botón de eliminar clickeado. Producto:", producto);
    setSelectedProducto(producto);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (productoId) => {
    try {
      console.log("Eliminar producto con ID:", productoId);
      // Realizar la solicitud para eliminar el producto
      await eliminarProducto(productoId);
      // Cerrar el modal después de la eliminación
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      // Manejar el error, por ejemplo, mostrar una notificación al usuario
    }
  };

  const handleClearFilter = () => {
    setSearchTerm(" "); // Limpiar término de búsqueda
    setSelectedTipo(""); // Establecer tipo de producto en null
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Productos</h1>
          <Link
            to="/registrar-producto"
            className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#c3eeeb] focus:outline-none w-44 text-center"
          >
            Añadir
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3 mt-3 flex flex-row">
          <input
            type="text"
            placeholder="Buscar Producto por nombre o código"
            className="p-2 border border-gray-300 rounded focus:outline-none w-full mr-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none w-72 px-3"
            placeholder="Tipo de Producto"
          >
            <option value="">Tipo de producto</option>
            {tipoProductos.map((tipo) => (
              <option key={tipo.id} value={tipo.nombre}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleClearFilter()}
            className="p-2 border border-gray-300 bg-slate-400 rounded focus:outline-none ml-2 w-72 font-semibold"
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Tabla de  productos */}
        <div className="h-[380px] bg-gray-50">
          <table className="min-w-full bg-white border border-slate-300 items-center rounded-lg">
            <thead className="bg-[#dfdfdf]">
              <tr>
                <th className="border-b p-2">Código</th>
                <th className="border-b p-2">Nombre</th>
                <th className="border-b p-2">Descripción</th>
                <th className="border-b p-2">Medida</th>
                <th className="border-b p-2">Cantidad</th>
                <th className="border-b p-2">Precio</th>
                <th className="border-b p-2">Tipo Producto</th>
                <th className="border-b p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td className="border-b p-2 text-center font-semibold">
                    {producto.codigo}
                  </td>
                  <td className="border-b p-2 text-start">{producto.nombre}</td>
                  <td className="border-b p-2 text-center">
                    {producto.descripcion}
                  </td>
                  <td className="border-b p-2 text-center">
                    {producto.medida}
                  </td>
                  <td className="border-b p-2 text-center">
                    {producto.cantidad}
                  </td>
                  <td className="border-b p-2 text-center">
                    ${producto.precioVenta}
                  </td>
                  <td className="border-b p-2 text-center">
                    {producto.TipoProducto
                      ? producto.TipoProducto.nombre
                      : "N/A"}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex flex-row justify-center">
                      <Link
                        to={`/editar-producto/${producto.id}`} // Ajusta la ruta según tu estructura de navegación
                        className="text-black hover:underline hover:text-emerald-500 text-center mx-2"
                      >
                        <FaIcons.FaPencilAlt></FaIcons.FaPencilAlt>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(producto)}
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
            producto={selectedProducto}
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

export default ConsultarProducto;
