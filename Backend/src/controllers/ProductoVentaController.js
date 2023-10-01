const ProductoVenta = require("../models/ProductoVenta");

// Crear
const createProductoVenta = async (req, res) => {
  try {
    const nuevaProductoVenta = await ProductoVenta.create(req.body);
    return res.status(201).json(nuevaProductoVenta);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear ProductoVenta" });
  }
};

// Obtener todos
const getAllProductoVentas = async (req, res) => {
  try {
    const productoVentas = await ProductoVenta.findAll();
    return res.status(200).json(productoVentas);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener ProductoVentas" });
  }
};

// Obtener por ID
const getProductoVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const productoVenta = await ProductoVenta.findByPk(id);
    if (!productoVenta) {
      return res.status(404).json({ error: "ProductoVenta no encontrado" });
    }
    return res.status(200).json(productoVenta);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener ProductoVenta" });
  }
};

// Actualizar
const updateProductoVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const productoVenta = await ProductoVenta.findByPk(id);
    if (!productoVenta) {
      return res.status(404).json({ error: "ProductoVenta no encontrado" });
    }
    await productoVenta.update(req.body);
    return res.status(200).json(productoVenta);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar ProductoVenta" });
  }
};

// Eliminar
const deleteProductoVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const productoVenta = await ProductoVenta.findByPk(id);
    if (!productoVenta) {
      return res.status(404).json({ error: "ProductoVenta no encontrado" });
    }
    await productoVenta.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar ProductoVenta" });
  }
};

module.exports = {
  createProductoVenta,
  getAllProductoVentas,
  getProductoVentaById,
  updateProductoVenta,
  deleteProductoVenta,
};
