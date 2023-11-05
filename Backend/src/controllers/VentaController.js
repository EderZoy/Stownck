const Venta = require("../models/Venta");
const FormaPago = require("../models/FormaPago");
const ProductoVenta = require("../models/ProductoVenta");
const Producto = require("../models/Producto");
const Usuario = require("../models/Usuario");

const ITEMS_PER_PAGE = 8; // Establece el número de elementos por página

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
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Obtener las ventas paginadas
    const { count, rows: ventas } = await Venta.findAndCountAll({
      limit: ITEMS_PER_PAGE,
      offset,
      include: [{ model: FormaPago }, { model: Usuario }],
    });

    // Obtener los detalles de ProductoVenta para cada venta
    const ventaConDetalles = await Promise.all(
      ventas.map(async (venta) => {
        const detalles = await ProductoVenta.findAll({
          where: { ventaId: venta.id },
          include: [Producto],
        });

        // Calcular el total de la venta sumando los precios de venta de los detalles
        const totalVenta = detalles.reduce((total, detalle) => {
          return total + detalle.precio * detalle.cantidad;
        }, 0);

        return {
          ...venta.toJSON(),
          detallesProductoVenta: detalles,
          total: totalVenta,
        };
      })
    );

    return res.status(200).json({
      ventas: ventaConDetalles,
      totalPages: Math.ceil(count / ITEMS_PER_PAGE),
      currentPage: page,
    });
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
        { model: Usuario },
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
