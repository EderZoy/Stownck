import config from "../config";

const actualizarProducto = async (id, datos) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto/update/${id}`,
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
      throw new Error("Error al actualizar el  producto");
    }

    const productoActualizado = await response.json();
    return productoActualizado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default actualizarProducto;
