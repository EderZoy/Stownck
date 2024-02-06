const express = require("express");
const EstadisticasController = require("../controllers/EstadisticasController");

const router = express.Router();

router.get(
  "/productos-mas-vendidos",
  EstadisticasController.productosMasVendidos
);
router.get("/ventas-forma-pago", EstadisticasController.ventasXFormaPago);
router.get("/compras-proveedor", EstadisticasController.comprasXproveedor);

module.exports = router;
