// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("townstore_db", "postgres", "43188288", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
