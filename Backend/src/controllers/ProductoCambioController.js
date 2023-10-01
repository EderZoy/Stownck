const ProductoCambio = require("../models/ProductoCambio");

// Crear
const createProductoCambio = async (req, res) => {
  try {
    const nuevoProductoCambio = await ProductoCambio.create(req.body);
    return res.status(201).json(nuevoProductoCambio);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el ProductoCambio" });
  }
};

// Obtener todos
const getAllProductoCambios = async (req, res) => {
  try {
    const productoCambios = await ProductoCambio.findAll();
    return res.status(200).json(productoCambios);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los ProductoCambios" });
  }
};

// Obtener por ID
const getProductoCambioById = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCambio = await ProductoCambio.findByPk(id);
    if (!productoCambio) {
      return res.status(404).json({ error: "ProductoCambio no encontrado" });
    }
    return res.status(200).json(productoCambio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el ProductoCambio" });
  }
};

// Actualizar
const updateProductoCambio = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCambio = await ProductoCambio.findByPk(id);
    if (!productoCambio) {
      return res.status(404).json({ error: "ProductoCambio no encontrado" });
    }
    await productoCambio.update(req.body);
    return res.status(200).json(productoCambio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el ProductoCambio" });
  }
};

// Eliminar
const deleteProductoCambio = async (req, res) => {
  const { id } = req.params;
  try {
    const productoCambio = await ProductoCambio.findByPk(id);
    if (!productoCambio) {
      return res.status(404).json({ error: "ProductoCambio no encontrado" });
    }
    await productoCambio.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el ProductoCambio" });
  }
};

module.exports = {
  createProductoCambio,
  getAllProductoCambios,
  getProductoCambioById,
  updateProductoCambio,
  deleteProductoCambio,
};
