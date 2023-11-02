const express = require("express");
const TipoProductoController = require("../controllers/TipoProductoController");

const router = express.Router();

// Rutas para TipoProducto
router.post("/tipo-producto/create", TipoProductoController.createTipoProducto);
router.get("/tipo-producto", TipoProductoController.getAllTipoProductos);
router.get("/tipo-producto/:id", TipoProductoController.getTipoProductoById);
router.put(
  "/tipo-producto/update/:id",
  TipoProductoController.updateTipoProducto
);
router.delete(
  "/tipo-producto/delete/:id",
  TipoProductoController.deleteTipoProducto
);
router.get("/tipos", TipoProductoController.getTipos);

module.exports = router;
