const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const ProductoCambio = require("../models/ProductoCambio");

const CambioMasivoPrecio = sequelize.define("CambioMasivoPrecio", {
  fechaCambio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  porcentajeCambio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tipoCambio: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = CambioMasivoPrecio;
