// controllers/TipoProductoController.js
const TipoProducto = require("../models/TipoProducto");

const ITEMS_PER_PAGE = 7; // Establece el número de elementos por página

// crear
const createTipoProducto = async (req, res) => {
  try {
    const tipoProducto = await TipoProducto.create(req.body);
    return res.status(201).json(tipoProducto);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear el tipo de producto" });
  }
};

// Obtener
const getAllTipoProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const tipoProductos = await TipoProducto.findAndCountAll({
      limit: ITEMS_PER_PAGE,
      offset,
    });

    return res.status(200).json({
      tipoProductos: tipoProductos.rows,
      currentPage: page,
      totalPages: Math.ceil(tipoProductos.count / ITEMS_PER_PAGE),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener tipos de producto" });
  }
};

const getTipoProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoProducto = await TipoProducto.findByPk(id);
    if (!tipoProducto) {
      return res.status(404).json({ error: "Tipo de producto no encontrado" });
    }
    return res.status(200).json(tipoProducto);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el tipo de producto" });
  }
};

// Editar
const updateTipoProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoProducto = await TipoProducto.findByPk(id);
    if (!tipoProducto) {
      return res.status(404).json({ error: "Tipo de producto no encontrado" });
    }
    await tipoProducto.update(req.body);
    return res.status(200).json(tipoProducto);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al actualizar el tipo de producto" });
  }
};

// Eliminar

const deleteTipoProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoProducto = await TipoProducto.findByPk(id);
    if (!tipoProducto) {
      return res.status(404).json({ error: "Tipo de producto no encontrado" });
    }
    await tipoProducto.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el tipo de producto" });
  }
};

// exportamos

module.exports = {
  createTipoProducto,
  getAllTipoProductos,
  getTipoProductoById,
  updateTipoProducto,
  deleteTipoProducto,
};
