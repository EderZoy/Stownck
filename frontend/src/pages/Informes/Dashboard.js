/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import obtenerProductosMasVendidos from "../../service/RequestEstadisticas/RequestGetProductosVendidos";
import obtenerVentasPorPago from "../../service/RequestEstadisticas/RequestGetVentasPorPago";
import obtenerComprasPorProveedor from "../../service/RequestEstadisticas/RequestGetComprasPorProveedor";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [miGrafico, setMiGrafico] = useState(null); // Estado para almacenar la instancia del gráfico

  const [dataVentasPorPago, setDataVentasPorPago] = useState([]);
  const [miGraficoVentasPago, setMiGraficoVentasPago] = useState(null);

  const [dataComprasPorProveedor, setDataComprasPorProveedor] = useState([]);
  const [miGraficoComprasPorProveedor, setMiGraficoComprasPorProveedor] =
    useState(null);

  useEffect(() => {
    const obtenerYActualizarDatos = async () => {
      try {
        // Obtener productos más vendidos
        const productos = await obtenerProductosMasVendidos();
        setData(productos);

        // Crear el nuevo gráfico
        const nuevoGrafico = new Chart(miGraficoRef.current, {
          type: "bar",
          data: {
            labels: productos.map((item) => `${item.nombre}`),
            datasets: [
              {
                label: "Cantidad de Ventas",
                data: productos.map((item) => item.total_ventas),
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          },
        });

        // Actualizar el estado con la nueva instancia del gráfico
        setMiGrafico(nuevoGrafico);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerYActualizarDatos();

    const obtenerYActualizarDatosVentas = async () => {
      try {
        const ventasPorTipoPago = await obtenerVentasPorPago();
        setDataVentasPorPago(ventasPorTipoPago);

        const nuevoGrafico = new Chart(miGraficoRefVentasPago.current, {
          type: "polarArea",
          data: {
            labels: ventasPorTipoPago.map((item) => item.nombre),
            datasets: [
              {
                data: ventasPorTipoPago.map((item) => item.cantidadVentas),
                backgroundColor: ["#275984", "#7fb5b5", "#d8a67b"],
              },
            ],
          },
        });

        setMiGraficoVentasPago(nuevoGrafico);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerYActualizarDatosVentas();

    const obtenerYActualizarDatosCompras = async () => {
      try {
        const comprasPorProveedor = await obtenerComprasPorProveedor();
        setDataComprasPorProveedor(comprasPorProveedor);

        // Crear el nuevo gráfico de área
        const nuevoGrafico = new Chart(miGraficoRefCompras.current, {
          type: "radar",
          data: {
            labels: comprasPorProveedor.map((item) => item.proveedor_nombre),
            datasets: [
              {
                label: "Total Compras",
                data: comprasPorProveedor.map((item) => item.total_compras),
                fill: true,
                backgroundColor: "rgba(153, 102, 204, 0.4)",
                borderColor: "rgba(153, 102, 204, 1)",
                borderWidth: 1,
              },
            ],
          },
        });

        setMiGraficoComprasPorProveedor(nuevoGrafico);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerYActualizarDatosCompras();
  }, []); // Sin dependencias para evitar bucles

  const miGraficoRef = useRef(null);
  const miGraficoRefVentasPago = useRef(null);
  const miGraficoRefCompras = useRef(null);

  return (
    <div className=" w-full h-screen items-start justify-center bg-[#7A7A7A] py-6">
      <div className="bg-[#eaeaea] p-6 rounded-xl mx-10 mb-96">
        <div className="p-1 items-center mb-3 bg-stone-300">
          <h1 className="text-3xl font-semibold text-center">Estadisticas</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="p-1 items-center  mb-1 bg-gray-100 rounded-sm px-8 mx-2 h-96 flex flex-col justify-between">
            <h1 className="text-xl font-semibold text-center">
              Productos más Vendidos
            </h1>
            <canvas ref={miGraficoRef} className="w-auto h-64"></canvas>
            <button className="p-1 border border-gray-300 bg-slate-400 hover:bg-slate-300 rounded focus:outline-none w-32 font-semibold mt-4 mb-4">
              Ver en detalle
            </button>
          </div>
          <div className="p-1 items-center  mb-1 bg-gray-100 rounded-sm px-2 mx-1 h-96 flex flex-col justify-between">
            <h1 className="text-xl font-semibold text-center">
              Ventas por tipo de pago
            </h1>
            <canvas
              ref={miGraficoRefVentasPago}
              className="w-auto h-64"
            ></canvas>
            <button className="p-1 border border-gray-300 bg-slate-400 hover:bg-slate-300 rounded focus:outline-none w-32 font-semibold mt-4 mb-4">
              Ver en detalle
            </button>
          </div>
          <div className="p-1 items-center  mb-1 bg-gray-100 rounded-sm px-2 mx-1 h-96 flex flex-col justify-between">
            <h1 className="text-xl font-semibold text-center">
              Compras por proveedor
            </h1>
            <canvas ref={miGraficoRefCompras} className="w-auto h-64"></canvas>
            <button className="p-1 border border-gray-300 bg-slate-400 hover:bg-slate-300 rounded focus:outline-none w-32 font-semibold mt-4 mb-4">
              Ver en detalle
            </button>
          </div>
        </div>
        <div className="p-1 items-center mt-4 bg-neutral-300">
          <h1 className="text-lg font-semibold text-center">
            Pronto podras consultas más estadisticas
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
