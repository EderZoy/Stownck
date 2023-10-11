import config from "../config";

const deleteTipoProducto = async (id) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/tipo-producto/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        // Puedes incluir el cuerpo de la solicitud (body) si es necesario
        // body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      // Manejar errores, por ejemplo, lanzar una excepción con un mensaje de error
      throw new Error(
        `Error al eliminar el tipo de producto: ${response.status}`
      );
    }
    const tipoProductoEliminado = await response.json();
    return tipoProductoEliminado;
  } catch (error) {
    // Manejar el error, puedes lanzar una excepción o devolver un objeto con información del error
    console.error("Error en la solicitud DELETE:", error.message);
    throw error;
  }
};

export default deleteTipoProducto;
