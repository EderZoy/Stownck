const express = require("express");
const ProductoController = require("../controllers/ProductoController");

const router = express.Router();

// Rutas para Producto
router.post("/producto/create", ProductoController.createProducto);
router.get("/producto", ProductoController.getAllProductos);
router.get("/producto/:id", ProductoController.getProductoById);
router.put("/producto/update/:id", ProductoController.updateProducto);
router.delete("/producto/delete/:id", ProductoController.deleteProducto);
router.get("/codigo", ProductoController.obtenerCodigoUnico);
router.get("/producto/codigo/:codigo", ProductoController.getProductoByCodigo);

module.exports = router;
