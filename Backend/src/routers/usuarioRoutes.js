const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = express.Router();

// Rutas para Usuario
router.post("/usuario/create", UsuarioController.createUsuario);
router.get("/usuario", UsuarioController.getAllUsuarios);
router.get("/usuario/:id", UsuarioController.getUsuarioById);
router.put("/usuario/update/:id", UsuarioController.updateUsuario);
router.delete("/usuario/delete/:id", UsuarioController.deleteUsuario);

module.exports = router;
