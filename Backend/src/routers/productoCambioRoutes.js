const express = require("express");
const ProductoCambioController = require("../controllers/ProductoCambioController");

const router = express.Router();

// Rutas para ProductoCambio
router.post(
  "/producto-cambio/create",
  ProductoCambioController.createProductoCambio
);
router.get("/producto-cambio", ProductoCambioController.getAllProductoCambios);
router.get(
  "/producto-cambio/:id",
  ProductoCambioController.getProductoCambioById
);
router.put(
  "/producto-cambio/update/:id",
  ProductoCambioController.updateProductoCambio
);
router.delete(
  "/producto-cambio/delete/:id",
  ProductoCambioController.deleteProductoCambio
);

module.exports = router;
