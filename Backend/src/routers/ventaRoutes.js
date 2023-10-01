const express = require("express");
const VentaController = require("../controllers/VentaController");

const router = express.Router();

// Rutas para Venta
router.post("/venta/create", VentaController.createVenta);
router.get("/venta", VentaController.getAllVentas);
router.get("/venta/:id", VentaController.getVentaById);
router.put("/venta/update/:id", VentaController.updateVenta);
router.delete("/venta/delete/:id", VentaController.deleteVenta);

module.exports = router;
