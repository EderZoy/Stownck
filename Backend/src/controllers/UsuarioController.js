const Usuario = require("../models/Usuario");

// crear
const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Obtener
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Editar
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.update(req.body);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Validar usuario para que login
const validarUsuario = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre, contraseña } });

    if (usuario) {
      res.status(200).json({ mensaje: "Usuario válido" });
    } else {
      res.status(401).json({ mensaje: "Usuario inválido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al validar el usuario" });
  }
};

// exportamos

module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  validarUsuario,
};
