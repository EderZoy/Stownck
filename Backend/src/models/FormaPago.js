const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FormaPago = sequelize.define(
  "FormaPago",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "FormasPago",
    timestamps: false, // No necesito campos de timestamp (createdAt, updatedAt)
  }
);

module.exports = FormaPago;
