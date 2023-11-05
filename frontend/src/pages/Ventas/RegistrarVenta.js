import React, { useState, useEffect } from "react";
import obtenerFormasPago from "../../service/RequestFormaPago/RequestFormasPago";
import obtenerUsuarios from "../../service/RequestUsuarios/RequestResponsables";
import * as FaIcons from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../../components/SearhBar";
import { Link } from "react-router-dom";
import {
  crearVenta,
  crearDetalleVenta,
  actualizarProducto,
} from "../../service/RequestVenta/RequestPostVenta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrarVenta = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [formasPago, setFormasPago] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState(null);
  const [nombreCliente, setNombreCliente] = useState("");

  const [detalleVenta, setDetalleVenta] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);

  const navigate = useNavigate();

  // función para obtener los productos del servidor
  const fetchData = async () => {
    try {
      const formasPago = await obtenerFormasPago();
      setFormasPago(formasPago); // Actualiza el estado de formas de pago

      // Obtener usuarios
      const responsables = await obtenerUsuarios(); // Reemplaza con la función correcta para obtener tipos
      setResponsables(responsables); // Actualiza el estado de responsables
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAgregarProducto = (producto) => {
    // Verificar si el producto ya está en la lista
    const productoExistente = detalleVenta.find(
      (detalle) => detalle.producto.id === producto.id
    );

    if (productoExistente) {
      // Si el producto ya está en la lista, puedes mostrar un mensaje o simplemente no hacer nada
      console.log("Producto ya seleccionado");
      return;
    }
    const nuevoDetalle = {
      producto,
      cantidad: 1,
      precio: producto.precioVenta,
    };

    setDetalleVenta([...detalleVenta, nuevoDetalle]);
  };

  const handleEliminarProducto = (index) => {
    const nuevosDetalles = [...detalleVenta];
    nuevosDetalles.splice(index, 1);
    setDetalleVenta(nuevosDetalles);
  };

  const handleCantidadChange = (index, cantidad) => {
    // Verificar que la cantidad no sea menor a 1 ni mayor a la cantidad del producto seleccionado
    const cantidadMaxima = detalleVenta[index].producto.cantidad; // Obtener la cantidad disponible del producto

    if (cantidad < 1) {
      cantidad = 1;
    } else if (cantidad > cantidadMaxima) {
      cantidad = cantidadMaxima;
    }

    const nuevosDetalles = [...detalleVenta];
    nuevosDetalles[index].cantidad = cantidad;
    setDetalleVenta(nuevosDetalles);
    // Recalcular el total
    calcularTotalVenta();
  };

  const calcularTotalVenta = () => {
    const total = detalleVenta.reduce((accum, detalle) => {
      return accum + detalle.cantidad * detalle.precio;
    }, 0);

    setTotalVenta(total);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleRegistroVenta = async () => {
    try {
      // Paso 1: Registrar la venta y obtener su ID
      const ventaData = {
        fechaVenta: selectedFecha,
        formaPagoId: selectedFormaPago,
        usuarioId: selectedResponsable,
        nombreCliente: nombreCliente,
      };
      const ventaResponse = await crearVenta(ventaData);
      const ventaId = ventaResponse.id;

      // Paso 2: Registrar los detalles de la venta
      await Promise.all(
        detalleVenta.map(async (detalle) => {
          const detalleVentaData = {
            productoId: detalle.producto.id,
            ventaId: ventaId,
            cantidad: detalle.cantidad,
            precio: detalle.producto.precioVenta,
          };
          await crearDetalleVenta(detalleVentaData);
        })
      );

      // Paso 3: Actualizar la cantidad en el producto
      await Promise.all(
        detalleVenta.map(async (detalle) => {
          const productoData = {
            cantidad: detalle.cantidad,
          };
          await actualizarProducto(detalle.producto.id, productoData);
        })
      );

      // Muestra la notificación de éxito
      toast.success(`Venta registrada con exito!`, {
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

      navigate("/consultar-ventas");

      console.log("Venta registrada exitosamente");
    } catch (error) {
      console.error("Error al registrar la venta", error.message);
    }
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96 pb-2">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Registrar Venta</h1>
        </div>

        <div className="flex flex-row justify-between">
          {/** Detalle de venta */}
          <div className="bg-white w-full mr-2 rounded-sm">
            <div className="flex flex-row justify-between items-center my-2">
              <h1 className="text-2xl font-semibold p-2">Detalle de Venta</h1>
              <div className="flex flex-col mr-2">
                <h1 className="text-xs font-semibold py-1 text-center bg-slate-100 my-1">
                  Si no encuentras el producto primero deberas registralo
                </h1>
                <div className=" rounded-sm border-2 r-5 w-96">
                  <SearchBar onSearch={handleAgregarProducto} />
                </div>
              </div>
            </div>

            <p className="mx-2 bg-slate-300 h-0.5"></p>

            {/* Mostrar el detalle de venta */}
            {detalleVenta.length === 0 && (
              <h2 className="text-center text-amber-500 text-xl font-semibold my-3">
                Seleccione los productos a vender
              </h2>
            )}
            {detalleVenta.length > 0 && (
              <table className="w-full mt-2 text-center border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1">Producto</th>
                    <th className="px-2 py-1">Medida</th>
                    <th className="px-2 py-1">Código</th>
                    <th className="px-2 py-1">Cantidad</th>
                    <th className="px-2 py-1">Stock Disponible</th>
                    <th className="px-2 py-1">Precio Venta</th>
                    <th className="px-2 py-1">Subtotal</th>
                    <th className="px-2 py-1">Quitar</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleVenta.map((detalle, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.nombre}
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.medida}
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.codigo}
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.cantidad}
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        <input
                          className="w-12 text-center border border-gray-100 rounded-md"
                          type="number"
                          value={detalle.cantidad}
                          onChange={(e) =>
                            handleCantidadChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="border-b-2 px-2 py-2">
                        <div className="flex flex-row">
                          <p>$</p>
                          <p className="w-20 text-center border border-gray-300 rounded-md ml-2">
                            {detalle.producto.precioVenta}
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        <div className="flex flex-row text-center justify-center">
                          <p className="mr-2">$</p>
                          {detalle.producto.precioVenta * detalle.cantidad}
                        </div>
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        <button onClick={() => handleEliminarProducto(index)}>
                          <FaIcons.FaTrashAlt></FaIcons.FaTrashAlt>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="text-sm text-end font-bold mr-20 mt-4 ">
              <p className=" text-yellow-600">
                Total Venta: ${totalVenta.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col  w-1/3">
            {/** Informacion de Venta*/}
            <div className="bg-white rounded-sm">
              <div>
                <h1 className="text-xl font-semibold p-2 my-2">
                  Información General
                </h1>
                <p className="mx-2 bg-slate-300 h-0.5"></p>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Forma de Pago
                </h1>
                <select
                  value={selectedFormaPago}
                  onChange={(e) => setSelectedFormaPago(e.target.value)}
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                  placeholder="Selecciona el proveedor"
                >
                  {formasPago.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Responsable
                </h1>
                <select
                  value={selectedResponsable}
                  onChange={(e) => setSelectedResponsable(e.target.value)}
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                  placeholder="Responsable"
                >
                  {responsables.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Nombre Cliente
                </h1>
                <input
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  placeholder="Cliente"
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                />
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Fecha de Compra
                </h1>
                <DatePicker
                  selected={selectedFecha}
                  onChange={(date) => setSelectedFecha(date)}
                  placeholderText="Seleccionar fecha"
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-4 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            to="/consultar-compras"
            className="p-2 bg-slate-700 text-white font-bold rounded hover:bg-slate-400 focus:outline-none w-44 text-center mr-2"
          >
            Cancelar
          </Link>
          <button
            onClick={handleRegistroVenta}
            className="bg-[#7BBBB7] hover:bg-[#c3eeeb] text-black font-bold px-4 py-2 rounded ml-2"
          >
            Registrar Venta
          </button>
          {/* Componente de contenedor de notificaciones */}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default RegistrarVenta;
