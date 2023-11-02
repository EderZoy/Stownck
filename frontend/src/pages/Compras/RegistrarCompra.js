import React, { useState, useEffect } from "react";
import obtenerProveedores from "../../service/RequestProveedor/RequestProveedores";
import obtenerUsuarios from "../../service/RequestUsuarios/RequestResponsables";
// import EditarTipoProducto from "./EditarTipoProducto";
import * as FaIcons from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../../components/SearhBar";
import { Link } from "react-router-dom";
import {
  crearCompra,
  crearDetalleCompra,
  actualizarProducto,
} from "../../service/RequestCompra/RequestPostCompra";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrarCompra = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [selectedResponsable, setSelectedResponsable] = useState(null);

  const [preciocompra, setPrecioCompra] = useState();
  const [porcentajeGanancia, setPorcentajeGanancia] = useState();
  const [precioVenta, setPrecioVenta] = useState(0);

  const [detalleCompra, setDetalleCompra] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  const navigate = useNavigate();

  // función para obtener los productos del servidor
  const fetchData = async () => {
    try {
      // Obtener proveedores
      const proveedores = await obtenerProveedores(); // Reemplaza con la función correcta para obtener tipos
      setProveedores(proveedores); // Actualiza el estado de proveedores

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
    const productoExistente = detalleCompra.find(
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
      precioCompra: 0,
      precioVenta: producto.precioVenta,
    };

    setDetalleCompra([...detalleCompra, nuevoDetalle]);
  };

  const handleEliminarProducto = (index) => {
    const nuevosDetalles = [...detalleCompra];
    nuevosDetalles.splice(index, 1);
    setDetalleCompra(nuevosDetalles);
  };

  const handleCantidadChange = (index, cantidad) => {
    // Verificar que la cantidad no sea menor a 1 ni mayor a la cantidad del producto seleccionado
    if (cantidad < 1) {
      cantidad = 1;
    }
    const nuevosDetalles = [...detalleCompra];
    nuevosDetalles[index].cantidad = cantidad;
    setDetalleCompra(nuevosDetalles);
    // Recalcular el total
    calcularTotalCompra();
  };

  const calcularTotalCompra = () => {
    const total = detalleCompra.reduce((accum, detalle) => {
      return accum + detalle.cantidad * detalle.precioCompra;
    }, 0);

    setTotalCompra(total);
  };

  const handlePrecioCompraChange = (index, nuevoprecioCompra) => {
    // Verificar que el precio de compra no sea menor a 1
    if (nuevoprecioCompra < 1) {
      nuevoprecioCompra = 1;
    }
    // Actualizar el precio de compra para el producto en la posición dada
    const nuevosDetalles = [...detalleCompra];
    nuevosDetalles[index].precioCompra = nuevoprecioCompra;
    setDetalleCompra(nuevosDetalles);

    // Recalcular el total
    calcularTotalCompra();
  };

  const handlePrecioVentaChange = (index, nuevoprecioVenta) => {
    // Verificar que el precio de venta no sea menor a 1
    if (nuevoprecioVenta < 1) {
      nuevoprecioVenta = 1;
    }
    // Actualizar el precio de venta para el producto en la posición dada
    const nuevosDetalles = [...detalleCompra];
    nuevosDetalles[index].precioVenta = nuevoprecioVenta;
    setDetalleCompra(nuevosDetalles);
  };

  const calcularPrecioVenta = (precioCompra, porcentajeGanancia) => {
    const gananciaDecimal = porcentajeGanancia / 100;
    const precioVenta = precioCompra * (1 + gananciaDecimal);
    return precioVenta.toFixed(2); // Redondear a dos decimales
  };
  // Función para manejar cambios en el precio de compra
  const handleprecioCompraChange = (event) => {
    const nuevoPrecioCompra = parseFloat(event.target.value);
    setPrecioCompra(nuevoPrecioCompra);

    // Recalcular el precio de venta cuando cambia el precio de compra
    const nuevoPrecioVenta = calcularPrecioVenta(
      nuevoPrecioCompra,
      porcentajeGanancia
    );
    setPrecioVenta(nuevoPrecioVenta);
  };

  // Función para manejar cambios en el porcentaje de ganancia
  const handlePorcentajeGananciaChange = (event) => {
    const nuevoPorcentajeGanancia = parseFloat(event.target.value);
    setPorcentajeGanancia(nuevoPorcentajeGanancia);

    // Recalcular el precio de venta cuando cambia el porcentaje de ganancia
    const nuevoPrecioVenta = calcularPrecioVenta(
      preciocompra,
      nuevoPorcentajeGanancia
    );
    setPrecioVenta(nuevoPrecioVenta);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleRegistroCompra = async () => {
    try {
      // Paso 1: Registrar la compra y obtener su ID
      const compraData = {
        fechaCompra: selectedFecha,
        proveedorId: selectedProveedor,
        usuarioId: selectedResponsable,
      };
      const compraResponse = await crearCompra(compraData);
      const compraId = compraResponse.id;

      // Paso 2: Registrar los detalles de la compra
      await Promise.all(
        detalleCompra.map(async (detalle) => {
          const detalleCompraData = {
            productoId: detalle.producto.id,
            compraId: compraId,
            cantidad: detalle.cantidad,
            precioCompra: detalle.precioCompra,
            precioVenta: detalle.precioVenta,
          };
          await crearDetalleCompra(detalleCompraData);
        })
      );

      // Paso 3: Actualizar el precio de venta y la cantidad en el producto
      await Promise.all(
        detalleCompra.map(async (detalle) => {
          const productoData = {
            precioVenta: detalle.precioVenta,
            cantidad: detalle.cantidad,
          };
          await actualizarProducto(detalle.producto.id, productoData);
        })
      );

      // Muestra la notificación de éxito
      toast.success(`Compra registrada con exito!`, {
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

      navigate("/consultar-compras");

      console.log("Compra registrada exitosamente");
    } catch (error) {
      console.error("Error al registrar la compra", error.message);
    }
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96 pb-2">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">Registrar Compra</h1>
        </div>

        <div className="flex flex-row justify-between">
          {/** Detalle de compra */}
          <div className="bg-white w-full mr-2 rounded-sm">
            <div className="flex flex-row justify-between items-center my-2">
              <h1 className="text-2xl font-semibold p-2">Detalle de Compra</h1>
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

            {/* Mostrar el detalle de compra */}
            {detalleCompra.length === 0 && (
              <h2 className="text-center text-amber-500 text-xl font-semibold my-3">
                Seleccione los productos comprados
              </h2>
            )}
            {detalleCompra.length > 0 && (
              <table className="w-full mt-2 text-center border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1">Producto</th>
                    <th className="px-2 py-1">Medida</th>
                    <th className="px-2 py-1">Código</th>
                    <th className="px-2 py-1">Cantidad</th>
                    <th className="px-2 py-1">Precio Compra</th>
                    <th className="px-2 py-1">Precio Venta</th>
                    <th className="px-2 py-1">Subtotal</th>
                    <th className="px-2 py-1">Quitar</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleCompra.map((detalle, index) => (
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
                          <input
                            className="w-20 text-center border border-gray-30 rounded-md ml-2"
                            type="number"
                            value={detalle.precioCompra}
                            onChange={(e) =>
                              handlePrecioCompraChange(
                                index,
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="border-b-2 px-2 py-2">
                        <div className="flex flex-row">
                          <p>$</p>
                          <input
                            className="w-20 text-center border border-gray-300 rounded-md ml-2"
                            type="number"
                            value={detalle.precioVenta}
                            onChange={(e) =>
                              handlePrecioVentaChange(
                                index,
                                parseFloat(e.target.value)
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        <div className="flex flex-row text-center justify-center">
                          <p className="mr-2">$</p>
                          {detalle.precioCompra * detalle.cantidad}
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
                Total Compra: ${totalCompra.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col  w-1/3">
            {/** Informacion de compra*/}
            <div className="bg-white rounded-sm">
              <div>
                <h1 className="text-xl font-semibold p-2 my-2">
                  Información General
                </h1>
                <p className="mx-2 bg-slate-300 h-0.5"></p>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Proveedor
                </h1>
                <select
                  value={selectedProveedor}
                  onChange={(e) => setSelectedProveedor(e.target.value)}
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                  placeholder="Selecciona el proveedor"
                >
                  {proveedores.map((tipo) => (
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

            <div className="bg-white rounded-sm mt-2">
              <h1 className="text-base font-semibold p-2 text-center">
                Calculadora de Ganancias
              </h1>
              <h1 className="text-xs text-slate-700 text-center px-2 mb-2">
                Ingrese el precio de compra y el porcentaje de ganancia para
                calcular el precio de venta
              </h1>
              {/* Campos para ingresar el precio de compra y el porcentaje de ganancia */}
              <div className="flex flex-row justify-between px-4 my-2 items-center">
                <p className="text-xs text-black font-semibold">
                  Precio Compra
                </p>
                <input
                  type="number"
                  value={preciocompra}
                  onChange={handleprecioCompraChange}
                  placeholder="Precio de Compra"
                  className="text-xs px-2 py-1 w-32 ml-3 bg-slate-200 rounded-sm text-center"
                />
              </div>
              <div className="flex flex-row justify-between px-4 my-2">
                <p className="text-xs text-black font-semibold">% ganancia</p>
                <input
                  type="number"
                  value={porcentajeGanancia}
                  onChange={handlePorcentajeGananciaChange}
                  placeholder="%"
                  className="text-xs px-2 py-1 w-32 ml-3 bg-slate-200 rounded-sm text-center"
                />
              </div>
              <div className="flex flex-row justify-between px-4 my-2">
                <p className="text-xs text-black font-semibold">Precio Venta</p>
                <p className="text-xs text-black font-bold bg-slate-300 w-32 rounded-sm py-1 px-2 text-center">
                  ${isNaN(precioVenta) ? "-" : ` ${precioVenta}`}
                </p>
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
            onClick={handleRegistroCompra}
            className="bg-[#7BBBB7] hover:bg-[#c3eeeb] text-black font-bold px-4 py-2 rounded ml-2"
          >
            Registrar Compra
          </button>
          {/* Componente de contenedor de notificaciones */}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default RegistrarCompra;
