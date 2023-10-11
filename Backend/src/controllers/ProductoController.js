const Producto = require("../models/Producto");
const TipoProducto = require("../models/TipoProducto");

const ITEMS_PER_PAGE = 7; // Establece el número de elementos por página

// Crear
const createProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

// Obtener
const getAllProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const productos = await Producto.findAndCountAll({
      limit: ITEMS_PER_PAGE,
      offset,
      include: [TipoProducto], // se incluye la relación con TipoProducto
    });

    return res.status(200).json({
      productos: productos.rows,
      currentPage: page,
      totalPages: Math.ceil(productos.count / ITEMS_PER_PAGE),
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id, {
      include: [TipoProducto],
    });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Editar
const updateProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await producto.update(req.body);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await producto.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};
