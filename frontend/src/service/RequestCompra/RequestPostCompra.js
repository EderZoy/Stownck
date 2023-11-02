import config from "../config";

// Función para realizar una solicitud POST para crear una compra
export const crearCompra = async (compraData) => {
  try {
    const response = await fetch(`${config.routeBase}/api/compra/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fechaCompra: compraData.fechaCompra,
        proveedorId: compraData.proveedorId,
        usuarioId: compraData.usuarioId,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la compra");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para realizar una solicitud POST para crear un detalle de compra
export const crearDetalleCompra = async (detalleCompra) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto-compra/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productoId: detalleCompra.productoId,
          compraId: detalleCompra.compraId,
          cantidad: detalleCompra.cantidad,
          precioCompra: detalleCompra.precioCompra,
          precioVenta: detalleCompra.precioVenta,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el detalle de compra");
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
      `${config.routeBase}/api/producto/update/${productoId}`,
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
