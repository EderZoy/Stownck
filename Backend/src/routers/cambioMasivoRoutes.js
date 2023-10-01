const express = require("express");
const CambioMasivoPrecioController = require("../controllers/CambioMasivoController");

const router = express.Router();

// Rutas para CambioMasivoPrecio
router.post(
  "/cambio-masivo-precio/create",
  CambioMasivoPrecioController.createCambioMasivoPrecio
);
router.get(
  "/cambio-masivo-precio",
  CambioMasivoPrecioController.getAllCambiosMasivosPrecio
);
router.get(
  "/cambio-masivo-precio/:id",
  CambioMasivoPrecioController.getCambioMasivoPrecioById
);
router.put(
  "/cambio-masivo-precio/update/:id",
  CambioMasivoPrecioController.updateCambioMasivoPrecio
);
router.delete(
  "/cambio-masivo-precio/delete/:id",
  CambioMasivoPrecioController.deleteCambioMasivoPrecio
);

module.exports = router;
