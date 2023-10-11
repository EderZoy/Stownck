import config from "../config";

const actualizarTipoProducto = async (id, datos) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/tipo-producto/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(datos),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el tipo de producto");
    }

    const tipoProductoActualizado = await response.json();
    return tipoProductoActualizado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default actualizarTipoProducto;
