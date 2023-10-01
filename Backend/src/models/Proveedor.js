// Modelo: Proveedor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Proveedor = sequelize.define("Proveedor", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Proveedor;
