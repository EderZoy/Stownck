import config from "../config";

// Función para realizar una solicitud POST para crear una venta
export const crearVenta = async (ventaData) => {
  try {
    const response = await fetch(`${config.routeBase}/api/venta/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fechaVenta: ventaData.fechaVenta,
        nombreCliente: ventaData.nombreCliente,
        formaPagoId: ventaData.formaPagoId,
        usuarioId: ventaData.usuarioId,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la venta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para realizar una solicitud POST para crear un detalle de venta
export const crearDetalleVenta = async (detalleVenta) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto-venta/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productoId: detalleVenta.productoId,
          ventaId: detalleVenta.ventaId,
          cantidad: detalleVenta.cantidad,
          precio: detalleVenta.precio,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el detalle de venta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para realizar una solicitud PUT para actualizar un producto
export const actualizarProducto = async (productoId, productoData) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto/updateVenta/${productoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productoData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
