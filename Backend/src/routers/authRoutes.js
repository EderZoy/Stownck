const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Ruta para el registro de usuarios
router.post("/signup", async (req, res) => {
  try {
    // Desestructura el cuerpo de la solicitud para obtener nombre, email y contraseña
    const { nombre, email, contraseña } = req.body;

    // Crea un nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
    });

    // Genera un token para el nuevo usuario
    const token = nuevoUsuario.generarToken();

    // Retorna el token y cualquier otra información necesaria
    res.json({ token, usuario: nuevoUsuario });
  } catch (error) {
    // Maneja los errores (puedes personalizar esto según tus necesidades)
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para el inicio de sesión
router.post("/login", async (req, res) => {
  try {
    // Desestructura el cuerpo de la solicitud para obtener email y contraseña
    const { nombre, contraseña } = req.body;

    // Busca al usuario en la base de datos por su email
    const usuario = await Usuario.findOne({ where: { nombre } });

    // Si no se encuentra el usuario o la contraseña es incorrecta, responde con un error
    if (!usuario || !(await usuario.validarContraseña(contraseña))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera un token para el usuario autenticado
    const token = usuario.generarToken();
    console.log(token);

    // Retorna el token y cualquier otra información necesaria
    res.json({ token, usuario });
  } catch (error) {
    // Maneja los errores (puedes personalizar esto según tus necesidades)
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para cerrar sesión
router.post("/logout", async (req, res) => {
  res.json({ mensaje: "Sesión cerrada exitosamente" });
});

module.exports = router;
