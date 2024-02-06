import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../../components/SearhBar";
import { Link } from "react-router-dom";
import {
  crearCambio,
  crearDetalleCambio,
  actualizarProducto,
} from "../../service/RequestCambioPrecios/RequestPostCambio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrarCambioMasivo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTipoCambio, setSelectedTipoCambio] = useState(1);
  const [selectedFecha, setSelectedFecha] = useState(null);
  let [porcentajeCambio, setPorcentaje] = useState(0);
  const [tiposCambio, setTiposCambio] = useState([]);
  const [detalleCambio, setDetalleCambio] = useState([]);
  const [NuevoPrecio, setTotalNuevoPrecio] = useState(0);

  const navigate = useNavigate();

  // función para obtener los productos del servidor
  const fetchData = async () => {
    try {
      const tiposCambio = [
        { id: 1, nombre: "Aumento" },
        { id: 2, nombre: "Rebaja" },
      ];

      setTiposCambio(tiposCambio);
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
    const productoExistente = detalleCambio.find(
      (detalle) => detalle.producto.id === producto.id
    );

    if (productoExistente) {
      // Si el producto ya está en la lista, puedes mostrar un mensaje o simplemente no hacer nada
      console.log("Producto ya seleccionado");
      return;
    }
    const nuevoDetalle = {
      producto,
      nuevoPrecio: 0,
    };

    setDetalleCambio([...detalleCambio, nuevoDetalle]);
  };

  const handleEliminarProducto = (index) => {
    const nuevosDetalles = [...detalleCambio];
    nuevosDetalles.splice(index, 1);
    setDetalleCambio(nuevosDetalles);
  };

  const calcularNuevoPrecio = () => {
    console.log(selectedTipoCambio);

    let factor = 1;

    if (selectedTipoCambio === 1) {
      factor = porcentajeCambio / 100;
    } else {
      factor = (-1 * porcentajeCambio) / 100;
    }

    const nuevosDetalles = detalleCambio.map((detalle) => ({
      ...detalle,
      nuevoPrecio:
        detalle.producto.precioVenta + detalle.producto.precioVenta * factor,
    }));

    console.log(nuevosDetalles);
    console.log(factor);
    console.log(detalleCambio);

    setDetalleCambio(nuevosDetalles);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleRegistroCambio = async () => {
    try {
      // Paso 1: Registrar
      const cambioData = {
        fechaCambio: selectedFecha,
        porcentaje: porcentajeCambio,
        tipoCambio: selectedTipoCambio,
      };
      const cambioResponse = await crearCambio(cambioData);
      const cambioMasivoId = cambioResponse.id;

      // Paso 2: Registrar los detalles de la venta
      await Promise.all(
        detalleCambio.map(async (detalle) => {
          const detalleCambio = {
            productoId: detalle.producto.id,
            cambioMasivoId: cambioMasivoId,
            nuevoPrecio: detalle.nuevoPrecio,
            precioActual: 0,
          };
          await crearDetalleCambio(detalleCambio);
        })
      );

      // Paso 3: Actualizar prcio en el producto
      await Promise.all(
        detalleCambio.map(async (detalle) => {
          const productoData = {
            precioVenta: detalle.nuevoPrecio,
          };
          await actualizarProducto(detalle.producto.id, productoData);
        })
      );

      // Muestra la notificación de éxito
      toast.success(`Cambio registrado con exito!`, {
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

      navigate("/principal");

      console.log("Cambio registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar el cambio", error.message);
    }
  };

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-44 mb-96 pb-2">
        <div className="flex flex-row p-1 justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">
            Registrar Cambio Masivo de Precios
          </h1>
        </div>

        <div className="flex flex-row justify-between">
          {/** Detalle de cambio */}
          <div className="bg-white w-full mr-2 rounded-sm">
            <div className="flex flex-row justify-between items-center my-2">
              <h1 className="text-2xl font-semibold p-2">Detalle de Cambio</h1>
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
            {detalleCambio.length === 0 && (
              <h2 className="text-center text-amber-500 text-xl font-semibold my-3">
                Seleccione los productos a modificar
              </h2>
            )}
            {detalleCambio.length > 0 && (
              <table className="w-full mt-2 text-center border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1">Producto</th>
                    <th className="px-2 py-1">Código</th>
                    <th className="px-2 py-1">Precio Actual</th>
                    <th className="px-2 py-1">Nuevo Precio</th>
                    <th className="px-2 py-1">Quitar</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleCambio.map((detalle, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.nombre}
                      </td>
                      <td className="px-2 py-2 border-b-2">
                        {detalle.producto.codigo}
                      </td>
                      <td className="border-b-2 px-2 py-2">
                        <div className="flex flex-row">
                          <p>$</p>
                          <p className="w-20 text-center border border-gray-300 rounded-md ml-2">
                            {detalle.producto.precioVenta}
                          </p>
                        </div>
                      </td>
                      <td className="border-b-2 px-2 py-2">
                        <div className="flex flex-row">
                          <p>$</p>
                          <p className="w-20 text-center border border-gray-300 rounded-md ml-2">
                            {detalle.nuevoPrecio.toFixed(2)}
                          </p>
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
          </div>

          <div className="flex flex-col  w-1/3">
            {/** Informacion de Cambio*/}
            <div className="bg-white rounded-sm">
              <div>
                <h1 className="text-xl font-semibold p-2 my-2 text-center">
                  Información de modificación
                </h1>
                <p className="mx-2 bg-slate-300 h-0.5"></p>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Tipo de Cambio
                </h1>
                <select
                  value={selectedTipoCambio}
                  onChange={(e) => setSelectedTipoCambio(e.target.value)}
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                  placeholder="Selecciona el proveedor"
                >
                  {tiposCambio.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  % de cambio
                </h1>
                <input
                  value={porcentajeCambio}
                  onChange={(e) => setPorcentaje(e.target.value)}
                  placeholder="%"
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-1 text-sm"
                  type="number"
                />
                <h1 className="text-sm font-semibold px-2 mt-2 mb-1">
                  Fecha de Cambio
                </h1>
                <DatePicker
                  selected={selectedFecha}
                  onChange={(date) => setSelectedFecha(date)}
                  placeholderText="Seleccionar fecha"
                  className="p-1 border border-gray-300 rounded focus:outline-none mr-2 ml-2 w-56 mb-4 text-sm"
                />

                <button
                  onClick={() => calcularNuevoPrecio()}
                  className="bg-[#7BBBB7] hover:bg-[#c3eeeb] text-black font-bold px-10 py-2 rounded mt-2 mx-12 mb-2 items-center"
                >
                  Calcular
                </button>
                <h1 className="text-xs font-semibold p-2 my-1 text-center">
                  Cuando presiones en calcular veras el nuevo precio en cada
                  producto.
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            to="/principal"
            className="p-2 bg-slate-700 text-white font-bold rounded hover:bg-slate-400 focus:outline-none w-44 text-center mr-2"
          >
            Cancelar
          </Link>
          <button
            onClick={handleRegistroCambio}
            className="bg-[#7BBBB7] hover:bg-[#c3eeeb] text-black font-bold px-4 py-2 rounded ml-2"
          >
            Registrar Cambio
          </button>
          {/* Componente de contenedor de notificaciones */}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default RegistrarCambioMasivo;
