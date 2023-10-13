import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crearProducto from "../../service/RequestProducto/RequestPostProducto";
import RequestGetCodigo from "../../service/RequestProducto/RequestGetCodigo";
import obtenerTipos from "../../service/RequestTipoProducto/RequestGetTipos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(null);
  const [medida, setMedida] = useState("");
  const [precioVenta, setPrecioVenta] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [tipoProductoId, setidTipoProducto] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [tipoProductos, setTiposProductos] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Obtener tipos de producto
      const tiposDeProducto = await obtenerTipos(); // Reemplaza con la función correcta para obtener tipos
      setTiposProductos(tiposDeProducto); // Actualiza el estado de tipos de producto

      const codigoGenerado = await RequestGetCodigo();
      setCodigo(codigoGenerado);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de campos
      if (!nombre) {
        setError("El nombre es obligatorio");
        return;
      }
      if (!cantidad) {
        setError("La cantidad es obligatoria");
        return;
      }
      if (cantidad < 0) {
        setError("La cantidad no puede ser negativa");
        return;
      }
      if (precioVenta < 0) {
        setError("El precio no puede ser negativo");
        return;
      }
      if (!precioVenta) {
        setError("El precio no puede ser nulo");
        return;
      }
      if (!codigo) {
        setError("El codigo no puede ser nulo");
        return;
      }
      if (!tipoProductoId) {
        setError("Debe seleccionar un tipo de producto");
        return;
      }

      console.log(tipoProductoId);

      // Enviar solicitud para crear el tipo de producto
      await crearProducto({
        nombre,
        descripcion,
        cantidad,
        codigo,
        medida,
        precioVenta,
        tipoProductoId,
      });

      // Muestra la notificación de éxito
      toast.success(`Producto ${nombre} registrado con exito!`, {
        position: "top-right",
        autoClose: 3000, // Cierra la notificación automáticamente después de 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Espera 3 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 4000));

      navigate("/consultar-productos"); // Cambia "/consultar" por la ruta que corresponda
      // Limpia los campos del formulario
      setNombre("");
      setDescripcion("");
      setCantidad(0);
      setMedida("");
      setPrecioVenta();
      setidTipoProducto();
      const codenuevo = RequestGetCodigo();
      setCodigo(codenuevo);
    } catch (error) {
      setError("Error al agregar el tipo de producto");
    }
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    // Verificar si es un número válido (mayor o igual a 0)
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
      setCantidad(nuevaCantidad);
    }
  };

  const handlePrecioChange = (e) => {
    const nuevoPrecio = e.target.value;
    // Verificar si es un número válido
    if (!isNaN(parseFloat(nuevoPrecio))) {
      setPrecioVenta(nuevoPrecio);
    }
  };

  return (
    <div className="w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#efefef] p-6 rounded-xl mx-72">
        <div className="flex flex-row p-1 justify-center items-center mb-2">
          <h1 className="text-3xl font-semibold">Registrar Producto</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-row">
            <div className="mb-4 mr-4">
              <label
                htmlFor="nombre"
                className="block text-lg font-medium text-gray-700"
              >
                Código
              </label>
              <input
                type="text"
                id="codigo"
                disabled="true"
                name="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="p-2 border border-gray-300 rounded text-center focus:outline-none font-semibold w-32"
              />
            </div>
            <div className="mb-4 mr-4">
              <label
                htmlFor="nombre"
                className="block text-lg font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none w-80"
              />
            </div>
            <div className="">
              <label
                htmlFor="TipoProducto"
                className="block text-lg font-medium text-gray-700"
              >
                Tipo de producto
              </label>
              <select
                value={selectedTipo}
                onChange={(e) => {
                  const selectedType = tipoProductos.find(
                    (tipo) => tipo.nombre === e.target.value
                  );
                  setSelectedTipo(e.target.value);
                  setidTipoProducto(selectedType ? selectedType.id : null);
                }}
                className="p-2 border border-gray-300 rounded focus:outline-none px-3 w-60"
                placeholder="Tipo de Producto"
              >
                {tipoProductos.map((tipo) => (
                  <option key={tipo.id} value={tipo.nombre}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-lg font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
            ></textarea>
          </div>

          <div className="flex flex-row justify-between">
            <div className="mb-4">
              <label
                htmlFor="medida"
                className="block text-lg font-medium text-gray-700"
              >
                Medida
              </label>
              <input
                type="text"
                id="medida"
                name="medida"
                value={medida}
                onChange={(e) => setMedida(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none w-56"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cantidad"
                className="block text-lg font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
                className="p-2 border border-gray-300 rounded focus:outline-none w-56"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="precio"
                className="block text-lg font-medium text-gray-700"
              >
                Precio venta
              </label>
              <div className="flex flex-row items-center border border-gray-300 rounded bg-white">
                <label
                  htmlFor="precio"
                  className="block text-xl font-medium text-gray-700 ml-2"
                >
                  $
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={precioVenta}
                  onChange={handlePrecioChange}
                  className="p-2 rounded focus:outline-none w-56"
                />
              </div>
              <label
                htmlFor="precio"
                className="block text-xs font-thin text-gray-700"
              >
                Aclaración: El punto es para indicar decimales
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 font-bold">{error}</p>}

          <div className="flex flex-row mt-4 justify-between items-center">
            <button
              onClick={() => {
                navigate("/consultar-productos");
              }}
              className="p-2  bg-slate-700 text-white font-bold rounded hover:bg-slate-400  focus:outline-none w-full mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-[#7BBBB7] text-black font-bold rounded hover:bg-[#b2e4e1] focus:outline-none w-full ml-4"
            >
              Registrar
            </button>

            {/* Componente de contenedor de notificaciones */}
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
