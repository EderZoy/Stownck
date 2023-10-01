const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Producto = require("./Producto");
const CambioMasivoPrecio = require("./CambioMasivoPrecio");

const ProductoCambio = sequelize.define(
  "ProductoCambio",
  {
    nuevoPrecio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    precioActual: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "ProductoCambio",
  }
);

ProductoCambio.belongsTo(Producto, { foreignKey: "productoId" });
ProductoCambio.belongsTo(CambioMasivoPrecio, { foreignKey: "cambioMasivoId" });

module.exports = ProductoCambio;
