const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proveedor = require("../models/Proveedor");
const Usuario = require("../models/Usuario");

const Compra = sequelize.define(
  "Compra",
  {
    fechaCompra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Compra",
    timestamps: true,
    createdAt: true,
  }
);

// Relaciones
Compra.belongsTo(Proveedor, { foreignKey: "proveedorId" });
Compra.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = Compra;
