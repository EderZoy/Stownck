import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useUser } from "./UserContext";

const NavBar = () => {
  const { userName } = useUser();
  console.log(userName);

  const [sidebar, setSidebar] = useState(false);
  const [fechaHora, setFecha] = useState("");

  const showSidebar = () => setSidebar(!sidebar);

  const obtenerFechaYHoraActual = () => {
    const fechaHoraActual = new Date();

    const optionsFecha = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatoFecha = new Intl.DateTimeFormat("es-ES", optionsFecha);
    const fechaFormateada = formatoFecha.format(fechaHoraActual);

    const optionsHora = { hour: "numeric", minute: "numeric", hour12: true };
    const formatoHora = new Intl.DateTimeFormat("es-ES", optionsHora);
    const horaFormateada = formatoHora.format(fechaHoraActual);

    const fechaYHoraFormateada = `${fechaFormateada} - ${horaFormateada}`;
    setFecha(fechaYHoraFormateada);
  };

  useEffect(() => {
    obtenerFechaYHoraActual();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center bg-[#D9D9D9] text-black p-2">
        <Link to="#" className="">
          <FaIcons.FaBars onClick={showSidebar} className="text-2xl" />
        </Link>
        <div className="text-2xl font-bold text-center items-center">
          STOWNCK
        </div>
        <div className="flex flex-col items-end">
          {/* Nombre del usuario */}
          <div className="flex flex-row mr-2">
            <span className="ml-2 font-semibold">{userName}</span>
            <span className="ml-2">
              <FaIcons.FaUserCircle className="text-2xl"></FaIcons.FaUserCircle>
            </span>
          </div>
          <div>
            <span className="font-medium text-xs mr-2">{fechaHora}</span>
          </div>
        </div>
      </div>
      <nav
        className={`${
          sidebar
            ? "bg-[#bfbebe] w-60 h-full flex justify-center fixed top-0 transition duration-300 left-0"
            : "left-[-100%] transition duration-850"
        }`}
      >
        {sidebar && (
          <ul onClick={showSidebar} className="w-full">
            <li className="bg-[#bfbebe] w-auto h-16 flex items-center justify-start">
              <Link to="#" className="ml-3 text-3xl  bg-transparent">
                <AiIcons.AiOutlineClose className="text-3xl" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path} className={item.cName}>
                    <div className="flex flex-row items-center">
                      {item.icono}
                      <span className="ml-3">{item.titulo}</span>
                    </div>
                  </Link>
                  <div className="border-b border-[#bab5b5] w-56 ml-2"></div>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
