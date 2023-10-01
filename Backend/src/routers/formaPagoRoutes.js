const express = require("express");
const FormaPagoController = require("../controllers/FormaPagoController");

const router = express.Router();

// Rutas para FormaPago
router.post("/forma-pago/create", FormaPagoController.createFormaPago);
router.get("/forma-pago", FormaPagoController.getAllFormasPago);
router.get("/forma-pago/:id", FormaPagoController.getFormaPagoById);
router.put("/forma-pago/update/:id", FormaPagoController.updateFormaPago);
router.delete("/forma-pago/delete/:id", FormaPagoController.deleteFormaPago);

module.exports = router;
