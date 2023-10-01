const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Producto = require("../models/Producto");
const Compra = require("../models/Compra");

const ProductoCompra = sequelize.define(
  "ProductoCompra",
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioCompra: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "ProductoCompra",
  }
);

ProductoCompra.belongsTo(Producto, { foreignKey: "productoId" });
ProductoCompra.belongsTo(Compra, { foreignKey: "compraId" });

module.exports = ProductoCompra;
