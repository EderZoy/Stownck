const express = require("express");
const ProductoCompraController = require("../controllers/ProductoCompraController");

const router = express.Router();

// Rutas para ProductoCompra
router.post(
  "/producto-compra/create",
  ProductoCompraController.createProductoCompra
);
router.get("/producto-compra", ProductoCompraController.getAllProductoCompras);
router.get(
  "/producto-compra/:id",
  ProductoCompraController.getProductoCompraById
);
router.put(
  "/producto-compra/update/:id",
  ProductoCompraController.updateProductoCompra
);
router.delete(
  "/producto-compra/delete/:id",
  ProductoCompraController.deleteProductoCompra
);

module.exports = router;
