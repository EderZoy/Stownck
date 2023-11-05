// Principal.js
import React, { useState } from "react";
import backgroundImage from "../images/fononegro.png"; // Ruta a tu imagen de fondo
import logo from "../images/logo.png";
import * as FaIcons from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import ProductoModal from "./Producto/BuscarProducto";
import obtenerInformacionProducto from "../service/RequestProducto/RequestInfoProducto";
import { useNavigate } from "react-router-dom";

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [isBusquedaModalOpen, setIsBusquedaModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const navigate = useNavigate(); // Obtén la función navigate

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    // Aquí puedes realizar alguna acción cuando se realiza la búsqueda
    console.log("Búsqueda realizada:", searchTerm);
    try {
      // Realizar la lógica para obtener la información del producto
      const productoEncontrado = await obtenerInformacionProducto(searchTerm);

      // Abrir el modal con la información del producto
      setIsBusquedaModalOpen(true);
      setSelectedProducto(productoEncontrado);
    } catch (error) {
      console.error("Error al obtener información del producto:", error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const addAlert = (message, type) => {
    const newAlert = { message, type };
    setAlerts([...alerts, newAlert]);
  };

  const handleConsultarCompras = () => {
    navigate("/consultar-compras"); // Usa la función navigate para ir a /consultar-compras
  };

  const handleConsultarVentas = () => {
    navigate("/consultar-ventas");
  };

  return (
    <div
      className="h-screen flex items-start justify-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex flex-col items-center justify-center rounded-xl w-[1000px]">
        <img
          src={logo}
          alt="Logo de la empresa"
          className="mx-auto w-28 mb-4 mt-4"
        />
        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Ingresa el código del producto a consultar"
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mr-2 w-[900px] rounded-lg"
          />

          <button onClick={handleSearch} className="absolute ml-[860px]">
            <FaIcons.FaSearch className="text-2xl"></FaIcons.FaSearch>
          </button>
        </div>

        {/* Botones de transacción */}
        <div className="mt-8 flex justify-between w-[900px]">
          <button
            className="py-8 w-72 bg-[#708786] text-black text-3xl rounded-lg hover:bg-[#7BBBB7] focus:outline-none font-semibold"
            onClick={handleConsultarCompras}
          >
            <FaIcons.FaTruckLoading className="text-2xl absolute  ml-[250px] mt-[-20px]"></FaIcons.FaTruckLoading>
            Registrar Compra
          </button>
          <button
            className="py-8 w-72 bg-[#708786] text-black text-3xl rounded-lg hover:bg-[#7BBBB7] focus:outline-none font-semibold"
            onClick={handleConsultarVentas}
          >
            <FaIcons.FaShoppingCart className="text-2xl absolute  ml-[250px] mt-[-20px]"></FaIcons.FaShoppingCart>
            Registrar Venta
          </button>
          <button
            className="py-8 w-72 bg-[#708786] text-black text-3xl rounded-lg hover:bg-[#7BBBB7] focus:outline-none font-semibold"
            onClick={() => ""}
          >
            <FaIcons.FaTags className="text-2xl absolute  ml-[250px] mt-[-20px]"></FaIcons.FaTags>
            Modificar Precios
          </button>
        </div>

        {/* Panel de alertas */}

        <div className="mt-4 bg-[#ADACAC] w-[900px] h-56 rounded-lg">
          <div className="flex flex-row items-center">
            <AiFillAlert className="mt-2 ml-4 text-xl"></AiFillAlert>

            <p className="text-black mt-2 ml-1 text-xl font-semibold">
              Panel de Alertas
            </p>
          </div>

          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-3 border ${
                alert.type === "error" ? "border-red-500" : "border-yellow-500"
              } bg-gray-100 rounded`}
            >
              {alert.message}
            </div>
          ))}
        </div>

        {isBusquedaModalOpen && (
          <ProductoModal
            isOpen={isBusquedaModalOpen}
            onRequestClose={() => setIsBusquedaModalOpen(false)}
            producto={selectedProducto}
          />
        )}
      </div>
    </div>
  );
};

export default Principal;
