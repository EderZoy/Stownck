const Producto = require("../models/Producto");
const CambioMasivoPrecio = require("../models/CambioMasivoPrecio");
const ProductoCambio = require("../models/ProductoCambio");

// Crear
const createCambioMasivoPrecio = async (req, res) => {
  try {
    const nuevoCambioMasivoPrecio = await CambioMasivoPrecio.create(req.body);
    return res.status(201).json(nuevoCambioMasivoPrecio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear el CambioMasivoPrecio" });
  }
};

// Obtener todos
const getAllCambiosMasivosPrecio = async (req, res) => {
  try {
    const cambiosMasivosPrecio = await CambioMasivoPrecio.findAll({
      include: [{ model: ProductoCambio, include: [Producto] }],
    });
    return res.status(200).json(cambiosMasivosPrecio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los CambiosMasivosPrecio" });
  }
};

// Obtener por ID
const getCambioMasivoPrecioById = async (req, res) => {
  const { id } = req.params;
  try {
    const cambioMasivoPrecio = await CambioMasivoPrecio.findByPk(id, {
      include: [{ model: ProductoCambio, include: [Producto] }],
    });
    if (!cambioMasivoPrecio) {
      return res
        .status(404)
        .json({ error: "CambioMasivoPrecio no encontrado" });
    }
    return res.status(200).json(cambioMasivoPrecio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el CambioMasivoPrecio" });
  }
};

// Actualizar
const updateCambioMasivoPrecio = async (req, res) => {
  const { id } = req.params;
  try {
    const cambioMasivoPrecio = await CambioMasivoPrecio.findByPk(id);
    if (!cambioMasivoPrecio) {
      return res
        .status(404)
        .json({ error: "CambioMasivoPrecio no encontrado" });
    }
    await cambioMasivoPrecio.update(req.body);
    return res.status(200).json(cambioMasivoPrecio);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el CambioMasivoPrecio" });
  }
};

// Eliminar
const deleteCambioMasivoPrecio = async (req, res) => {
  const { id } = req.params;
  try {
    const cambioMasivoPrecio = await CambioMasivoPrecio.findByPk(id);
    if (!cambioMasivoPrecio) {
      return res
        .status(404)
        .json({ error: "CambioMasivoPrecio no encontrado" });
    }
    await cambioMasivoPrecio.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el CambioMasivoPrecio" });
  }
};

module.exports = {
  createCambioMasivoPrecio,
  getAllCambiosMasivosPrecio,
  getCambioMasivoPrecioById,
  updateCambioMasivoPrecio,
  deleteCambioMasivoPrecio,
};
