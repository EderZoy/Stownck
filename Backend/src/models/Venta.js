const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const FormaPago = require("./FormaPago");
const Usuario = require("../models/Usuario");

const Venta = sequelize.define(
  "Venta",
  {
    fechaVenta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Venta",
  }
);

Venta.belongsTo(FormaPago, { foreignKey: "formaPagoId" });
Venta.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = Venta;
