// models/TipoProducto.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TipoProducto = sequelize.define("TipoProducto", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
});

module.exports = TipoProducto;
