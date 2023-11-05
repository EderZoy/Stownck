import config from "../config";

const deleteVenta = async (id) => {
  try {
    const response = await fetch(`${config.routeBase}/api/venta/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      // Manejar errores, por ejemplo, lanzar una excepción con un mensaje de error
      throw new Error(`Error al eliminar la venta: ${response.status}`);
    }
    const ventaEliminada = await response.json();
    return ventaEliminada;
  } catch (error) {
    // Manejar el error, puedes lanzar una excepción o devolver un objeto con información del error
    console.error("Error en la solicitud DELETE:", error.message);
    throw error;
  }
};

export default deleteVenta;
