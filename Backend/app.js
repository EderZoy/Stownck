const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const tipoProductoRoutes = require("./src/routers/tipoProductoRoutes");
const usuarioRoutes = require("./src/routers/usuarioRoutes");
const proveedorRoutes = require("./src/routers/proveedorRoutes");
const formaPagoRoutes = require("./src/routers/formaPagoRoutes");
const productoRoutes = require("./src/routers/productoRoutes");
const compraRoutes = require("./src/routers/compraRoutes");
const productoCompraRoutes = require("./src/routers/productoCompraRoutes");
const productoVentaRoutes = require("./src/routers/productoVentaRoutes");
const ventaRoutes = require("./src/routers/ventaRoutes");
const productoCambioRoutes = require("./src/routers/productoCambioRoutes");
const cambioMasivoRoutes = require("./src/routers/cambioMasivoRoutes");

const app = express();
// Configurar CORS
app.use(cors());

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
app.use("/api", usuarioRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", formaPagoRoutes);
app.use("/api", productoRoutes);
app.use("/api", compraRoutes);
app.use("/api", ventaRoutes);
app.use("/api", cambioMasivoRoutes);
app.use("/api", productoCompraRoutes);
app.use("/api", productoVentaRoutes);
app.use("/api", productoCambioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
