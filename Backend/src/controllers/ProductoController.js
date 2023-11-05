const Producto = require("../models/Producto");
const TipoProducto = require("../models/TipoProducto");

const ITEMS_PER_PAGE = 8; // Establece el número de elementos por página

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

// Editar Producto cuando se compra
const updateProductoCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Sumar la cantidad si se proporciona en la solicitud
    if (req.body.cantidad !== undefined) {
      producto.cantidad += req.body.cantidad;
    }
    // Actualizar precio de venta si se proporciona en la solicitud
    if (req.body.precioVenta !== undefined) {
      producto.precioVenta = req.body.precioVenta;
    }
    // Guardar los cambios en la base de datos
    await producto.save();

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Editar Producto Venta
const updateProductoVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Restar la cantidad si se proporciona en la solicitud
    if (req.body.cantidad !== undefined) {
      producto.cantidad -= req.body.cantidad;
    }
    // Guardar los cambios en la base de datos
    await producto.save();

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

// Generar código
const generarCodigoUnico = async () => {
  try {
    const longitudCodigo = 6;
    const caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigoGenerado = "";

    for (let i = 0; i < longitudCodigo; i++) {
      const caracterAleatorio =
        caracteresPermitidos[
          Math.floor(Math.random() * caracteresPermitidos.length)
        ];
      codigoGenerado += caracterAleatorio;
    }

    // Verificar si el código generado ya existe en la base de datos
    const productoConCodigo = await Producto.findOne({
      where: { codigo: codigoGenerado },
    });

    // Si el código ya existe, llamamos recursivamente a la función hasta que obtengamos uno único
    if (productoConCodigo) {
      return generarCodigoUnico();
    }

    console.log(codigoGenerado);

    return codigoGenerado;
  } catch (error) {
    console.error("Error al generar código único:", error);
    throw error;
  }
};

const obtenerCodigoUnico = async (req, res) => {
  try {
    const codigoGenerado = await generarCodigoUnico();
    res.status(200).json({ codigo: codigoGenerado });
  } catch (error) {
    console.error("Error al obtener código único:", error);
    res.status(500).json({ error: "Error al obtener código único" });
  }
};

const getProductoByCodigo = async (req, res) => {
  const { codigo } = req.params;

  try {
    const producto = await Producto.findOne({
      where: { codigo },
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener el producto por código:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Obtener productos para lista
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProductoCompra,
  updateProductoVenta,
  updateProducto,
  deleteProducto,
  obtenerCodigoUnico,
  getProductoByCodigo,
  getProductos,
};
