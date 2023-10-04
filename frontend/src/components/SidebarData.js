import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  {
    titulo: "Inicio",
    path: "/principal",
    icono: <AiIcons.AiFillHome />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Productos",
    path: "/productos",
    icono: <FaIcons.FaTshirt />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Informes",
    path: "/dashboard",
    icono: <FaIcons.FaRegChartBar />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Tipo de Producto",
    path: "/tipoproductos",
    icono: <PiIcons.PiCoatHangerBold />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Proveedores",
    path: "/proveedores",
    icono: <FaIcons.FaDolly />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Formas de Pago",
    path: "/formaspago",
    icono: <FaIcons.FaWallet />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#7BBBB7]",
  },
  {
    titulo: "Cerrar sesión",
    path: "/login",
    icono: <BsIcons.BsBoxArrowLeft />,
    cName:
      "text-decoration-none text-black text-xl w-95 h-12 flex items-center px-4 rounded hover:bg-[#FF4444] mt-60",
  },
];
