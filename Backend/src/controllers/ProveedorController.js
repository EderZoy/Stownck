const Proveedor = require("../models/Proveedor");

// Crear
const createProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    return res.status(201).json(nuevoProveedor);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el proveedor" });
  }
};

// Obtener todos los proveedores
const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    return res.status(200).json(proveedores);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener proveedores" });
  }
};

// Obtener proveedor por ID
const getProveedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    return res.status(200).json(proveedor);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el proveedor" });
  }
};

// Editar proveedor
const updateProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    await proveedor.update(req.body);
    return res.status(200).json(proveedor);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el proveedor" });
  }
};

// Eliminar proveedor
const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    await proveedor.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el proveedor" });
  }
};

// Exportar funciones
module.exports = {
  createProveedor,
  getAllProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
};
