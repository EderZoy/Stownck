const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Producto = require("./Producto");
const Venta = require("./Venta");

const ProductoVenta = sequelize.define(
  "ProductoVenta",
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "ProductoVenta",
    timestamps: false,
  }
);

ProductoVenta.belongsTo(Producto, { foreignKey: "productoId" });
ProductoVenta.belongsTo(Venta, { foreignKey: "ventaId" });

module.exports = ProductoVenta;
