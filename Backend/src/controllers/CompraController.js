const ProductoCompra = require("../models/ProductoCompra");
const Proveedor = require("../models/Proveedor");
const Usuario = require("../models/Usuario");
const Compra = require("../models/Compra");
const Producto = require("../models/Producto");

const createCompra = async (req, res) => {
  try {
    const nuevaCompra = await Compra.create(req.body);
    return res.status(201).json(nuevaCompra);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la compra" });
  }
};

const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [{ model: Proveedor }, { model: Usuario }],
    });

    // Obtener los detalles de ProductoCompra para cada compra
    const comprasConDetalles = await Promise.all(
      compras.map(async (compra) => {
        const detalles = await ProductoCompra.findAll({
          where: { compraId: compra.id },
          include: [Producto],
        });

        return {
          ...compra.toJSON(),
          detallesProductoCompra: detalles,
        };
      })
    );

    return res.status(200).json(comprasConDetalles);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las compras" });
  }
};

const getCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id, {
      include: [
        { model: [ProductoCompra], include: Producto },
        { model: Proveedor },
        { model: Usuario },
      ],
    });
    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    return res.status(200).json(compra);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la compra" });
  }
};

const updateCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    await compra.update(req.body);
    return res.status(200).json(compra);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la compra" });
  }
};

const deleteCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    await compra.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la compra" });
  }
};

module.exports = {
  createCompra,
  getAllCompras,
  getCompraById,
  updateCompra,
  deleteCompra,
};
