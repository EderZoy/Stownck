// Header.js
import React, { useState } from "react";
import { FaUserCircle, FaAlignJustify } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = ({ userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex justify-between items-center bg-[#D9D9D9] text-black p-4">
      <div className="cursor-pointer" onClick={toggleMenu}>
        <FaAlignJustify className="text-2xl"></FaAlignJustify>
      </div>
      <div className="text-2xl font-bold text-center items-center">STOWNCK</div>
      <div className="flex items-center">
        {/* Nombre del usuario */}
        <span className="ml-2 font-semibold">{userName}</span>
        <span className="ml-2">
          <FaUserCircle className="text-2xl"></FaUserCircle>
        </span>
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="absolute top-0 mt-2 p-2 bg-white border border-gray-300 rounded ml-4">
          <NavLink
            to="/dashboard"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Dashboard
          </NavLink>
          {/* Agrega más elementos de menú según tu necesidad */}
        </div>
      )}
    </div>
  );
};

export default Header;
