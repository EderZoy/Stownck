import config from "../config";

const deleteFormaPago = async (id) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/forma-pago/delete/${id}`,
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
      throw new Error(`Error al eliminar la forma de pago: ${response.status}`);
    }
    const formaPagoEliminada = await response.json();
    return formaPagoEliminada;
  } catch (error) {
    // Manejar el error, puedes lanzar una excepción o devolver un objeto con información del error
    console.error("Error en la solicitud DELETE:", error.message);
    throw error;
  }
};

export default deleteFormaPago;
