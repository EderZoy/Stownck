const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const TipoProducto = require("../models/TipoProducto");

const Producto = sequelize.define(
  "Producto",
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "Producto",
    timestamps: true,
  }
);

// Relación con TipoProducto
Producto.belongsTo(TipoProducto, { foreignKey: "tipoProductoId" });

module.exports = Producto;
