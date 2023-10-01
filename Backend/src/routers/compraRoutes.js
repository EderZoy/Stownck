const express = require("express");
const CompraController = require("../controllers/CompraController");

const router = express.Router();

// Rutas para Compra
router.post("/compra/create", CompraController.createCompra);
router.get("/compra", CompraController.getAllCompras);
router.get("/compra/:id", CompraController.getCompraById);
router.put("/compra/update/:id", CompraController.updateCompra);
router.delete("/compra/delete/:id", CompraController.deleteCompra);

module.exports = router;
