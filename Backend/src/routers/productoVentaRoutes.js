const express = require("express");
const ProductoVentaController = require("../controllers/ProductoVentaController");

const router = express.Router();

// Rutas para ProductoVenta
router.post(
  "/producto-venta/create",
  ProductoVentaController.createProductoVenta
);
router.get("/producto-venta", ProductoVentaController.getAllProductoVentas);
router.get("/producto-venta/:id", ProductoVentaController.getProductoVentaById);
router.put(
  "/producto-venta/update/:id",
  ProductoVentaController.updateProductoVenta
);
router.delete(
  "/producto-venta/delete/:id",
  ProductoVentaController.deleteProductoVenta
);

module.exports = router;
