import config from "../config";

const actualizarFormaPago = async (id, datos) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/forma-pago/update/${id}`,
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
      throw new Error("Error al actualizar la forma de pago");
    }

    const formaPagoActualizada = await response.json();
    return formaPagoActualizada;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default actualizarFormaPago;
