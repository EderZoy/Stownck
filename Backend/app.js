const express = require("express");
const sequelize = require("./db");
const tipoProductoRoutes = require("./routes/tipoProductoRoutes");

const app = express();

// Sincronizacion de Sequelize con la base de datos.
sequelize
  .sync()
  .then(() => {
    console.log("Conexión exitosa con la base de datos.");
  })
  .catch((error) => {
    console.error("Error en la conexión con la base de datos:", error);
  });

// Configuracion de middleware y rutas.
app.use(express.json());
app.use("/api", tipoProductoRoutes);
// Agregar más rutas para las demás entidades.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
