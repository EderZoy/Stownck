const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const FormaPago = require("./FormaPago");

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

module.exports = Venta;
