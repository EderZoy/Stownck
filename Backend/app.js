const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routers/authRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
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
const estadisticasRoutes = require("./src/routers/estadisticasRoutes");
const claveSecreta = require("./src/config/claveSecreta");

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
app.use("/api", authMiddleware, tipoProductoRoutes);
app.use("/api", authMiddleware, usuarioRoutes);
app.use("/api", authMiddleware, proveedorRoutes);
app.use("/api", authMiddleware, formaPagoRoutes);
app.use("/api", authMiddleware, productoRoutes);
app.use("/api", authMiddleware, compraRoutes);
app.use("/api", authMiddleware, ventaRoutes);
app.use("/api", authMiddleware, cambioMasivoRoutes);
app.use("/api", authMiddleware, productoCompraRoutes);
app.use("/api", authMiddleware, productoVentaRoutes);
app.use("/api", authMiddleware, productoCambioRoutes);
app.use("/api", authMiddleware, estadisticasRoutes);
// Rutas de autenticación
app.use("/auth", authRoutes);

app.get("/api/get-secret-key", authMiddleware, (req, res) => {
  // Solo devolver la clave si la solicitud está autenticada
  res.json({ secretKey: claveSecreta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

console.log("Clave secreta:", claveSecreta);
