const Venta = require("../models/Venta");

// Crear
const createVenta = async (req, res) => {
  try {
    const nuevaVenta = await Venta.create(req.body);
    return res.status(201).json(nuevaVenta);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la Venta" });
  }
};

// Obtener todos
const getAllVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        {
          model: ProductoVenta,
          include: [Producto], // Incluye los detalles del ProductoVenta y el Producto asociado
        },
        { model: FormaPago },
      ],
    });
    return res.status(200).json(ventas);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las Ventas" });
  }
};

// Obtener por ID
const getVentaById = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id, {
      include: [
        {
          model: ProductoVenta,
          include: [Producto], // Incluye los detalles del ProductoVenta y el Producto asociado
        },
        { model: FormaPago },
      ],
    });

    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    return res.status(200).json(venta);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la venta" });
  }
};

// Actualizar
const updateVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    await venta.update(req.body);
    return res.status(200).json(venta);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la Venta" });
  }
};

// Eliminar
const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    await venta.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la Venta" });
  }
};

module.exports = {
  createVenta,
  getAllVentas,
  getVentaById,
  updateVenta,
  deleteVenta,
};
