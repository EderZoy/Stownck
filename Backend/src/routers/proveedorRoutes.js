const express = require("express");
const ProveedorController = require("../controllers/ProveedorController");

const router = express.Router();

// Rutas para Proveedor
router.post("/proveedor/create", ProveedorController.createProveedor);
router.get("/proveedor", ProveedorController.getAllProveedores);
router.get("/proveedor/:id", ProveedorController.getProveedorById);
router.put("/proveedor/update/:id", ProveedorController.updateProveedor);
router.delete("/proveedor/delete/:id", ProveedorController.deleteProveedor);

module.exports = router;
