import config from "../config";

// Función para realizar una solicitud POST para crear un cambio masivo
export const crearCambio = async (cambioData) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/cambio-masivo-precio/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fechaCambio: cambioData.fechaCambio,
          porcentajeCambio: cambioData.porcentaje,
          tipoCambio: cambioData.tipoCambio,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar precios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para realizar una solicitud POST para crear un detalle de cambio
export const crearDetalleCambio = async (detalleCambio) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto-cambio/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productoId: detalleCambio.productoId,
          cambioMasivoId: detalleCambio.cambioMasivoId,
          nuevoPrecio: detalleCambio.nuevoPrecio,
          precioActual: detalleCambio.precioActual,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el detalle");
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
      `${config.routeBase}/api/producto/updateProductoCambio/${productoId}`,
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
