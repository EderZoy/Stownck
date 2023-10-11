const FormaPago = require("../models/FormaPago");

const ITEMS_PER_PAGE = 7; // Establece el número de elementos por página

// Crear
const createFormaPago = async (req, res) => {
  try {
    const nuevaFormaPago = await FormaPago.create(req.body);
    return res.status(201).json(nuevaFormaPago);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear forma de pago" });
  }
};

// Obtener
const getAllFormasPago = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const formaPagos = await FormaPago.findAndCountAll({
      limit: ITEMS_PER_PAGE,
      offset,
    });

    return res.status(200).json({
      formaPagos: formaPagos.rows,
      currentPage: page,
      totalPages: Math.ceil(formaPagos.count / ITEMS_PER_PAGE),
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener formas de pago" });
  }
};

const getFormaPagoById = async (req, res) => {
  const { id } = req.params;
  try {
    const formaPago = await FormaPago.findByPk(id);
    if (!formaPago) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }
    return res.status(200).json(formaPago);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener forma de pago" });
  }
};

// Editar
const updateFormaPago = async (req, res) => {
  const { id } = req.params;
  try {
    const formaPago = await FormaPago.findByPk(id);
    if (!formaPago) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }
    await formaPago.update(req.body);
    return res.status(200).json(formaPago);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar forma de pago" });
  }
};

// Eliminar
const deleteFormaPago = async (req, res) => {
  const { id } = req.params;
  try {
    const formaPago = await FormaPago.findByPk(id);
    if (!formaPago) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }
    await formaPago.destroy();
    return res.status(204).send(); // 204 significa "No Content"
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar forma de pago" });
  }
};

module.exports = {
  createFormaPago,
  getAllFormasPago,
  getFormaPagoById,
  updateFormaPago,
  deleteFormaPago,
};
