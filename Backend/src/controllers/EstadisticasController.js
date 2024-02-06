const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "townstore_db",
  password: "43188288",
  port: 5432,
});

// Resto de tu código...

const queryProductosMasVendidos = ` SELECT PR.id AS "producto_id",
    PR."nombre",
    SUM(PV."cantidad") AS "total_ventas"
FROM "ProductoVenta" AS PV
    INNER JOIN "Venta" AS V ON V.id = PV."ventaId"
    INNER JOIN "Producto" AS PR ON PR.id = PV."productoId"
GROUP BY PR.id
ORDER BY total_ventas DESC
LIMIT 5  -- Limitamos a los 5 productos más vendidos;`;

const queryVentasTipoPago = ` SELECT 
FP."nombre",
COUNT(*) AS "cantidadVentas",
COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS "porcentaje"
FROM "Venta" AS V
INNER JOIN "FormasPago" AS FP ON FP."id" = V."formaPagoId"
GROUP BY FP."id";`;

const queryComprasProveedor = `SELECT
P."id",
P."nombre" AS proveedor_nombre,
COUNT(*) AS total_compras
FROM
"Compra" AS C
INNER JOIN "Proveedors" AS P ON C."proveedorId" = P."id"
GROUP BY
P."id", P."nombre"
ORDER BY
total_compras DESC;`;

// En tu controlador o ruta de Node.js
const productosMasVendidos = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await pool.query(queryProductosMasVendidos);

    // Envía los resultados al cliente React
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datossss" });
  }
};

const ventasXFormaPago = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await pool.query(queryVentasTipoPago);

    // Envía los resultados al cliente React
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datossss" });
  }
};

const comprasXproveedor = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await pool.query(queryComprasProveedor);

    // Envía los resultados al cliente React
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datossss" });
  }
};

module.exports = {
  productosMasVendidos,
  ventasXFormaPago,
  comprasXproveedor,
};
