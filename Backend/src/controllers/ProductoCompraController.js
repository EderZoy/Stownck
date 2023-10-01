const ProductoCompra = require("../models/ProductoCompra");

// Crear
const createProductoCompra = async (req, res) => {
  try {
    const nuevaProductoCompra = await ProductoCompra.create(req.body);
    return res.status(201).json(nuevaProductoCompra);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear ProductoCompra" });
  }
};

// Obtener todos
const getAllProductoCompras = async (req, res) => {
  try {
    const productoCompras = await ProductoCompra.findAll();
    return res.status(200).json(productoCompras);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener ProductoCompras" });
  }
};

// Obtener por ID
const getProductoCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCompra = await ProductoCompra.findByPk(id);
    if (!productoCompra) {
      return res.status(404).json({ error: "ProductoCompra no encontrado" });
    }
    return res.status(200).json(productoCompra);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener ProductoCompra" });
  }
};

// Actualizar
const updateProductoCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCompra = await ProductoCompra.findByPk(id);
    if (!productoCompra) {
      return res.status(404).json({ error: "ProductoCompra no encontrado" });
    }
    await productoCompra.update(req.body);
    return res.status(200).json(productoCompra);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar ProductoCompra" });
  }
};

// Eliminar
const deleteProductoCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCompra = await ProductoCompra.findByPk(id);
    if (!productoCompra) {
      return res.status(404).json({ error: "ProductoCompra no encontrado" });
    }
    await productoCompra.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar ProductoCompra" });
  }
};

module.exports = {
  createProductoCompra,
  getAllProductoCompras,
  getProductoCompraById,
  updateProductoCompra,
  deleteProductoCompra,
};
