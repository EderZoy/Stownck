import React, { useState, useEffect } from "react";
import obtenerProductos from "../service/RequestProducto/RequestProductos";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await obtenerProductos();
        if (Array.isArray(productsData)) {
          setProductos(productsData);
        } else {
          throw new Error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.nombre);
    onSearch(suggestion);
  };

  const filteredProducts = productos.filter(
    (product) =>
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Buscar producto por código o nombre"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full p-1 rounded-sm px-3"
      />
      {searchTerm && filteredProducts.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%", // Ancho igual al de la barra de búsqueda
            zIndex: 999,
            backgroundColor: "white", // Fondo blanco
            border: "1px solid #ccc", // Borde para separar
          }}
        >
          {filteredProducts.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleSuggestionClick(suggestion);
                setSearchTerm(""); // Limpiar el término de búsqueda al seleccionar
              }}
              style={{
                padding: "8px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{suggestion.nombre}</span>
              <span>{suggestion.medida}</span>
              <span className="font-bold text-teal-800">
                {suggestion.codigo}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
