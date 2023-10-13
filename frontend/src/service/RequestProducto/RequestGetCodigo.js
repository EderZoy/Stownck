import config from "../config";

const obtenerCodigo = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/codigo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const codigoUnico = data.codigo;

    console.log("Código único obtenido:", codigoUnico);

    return codigoUnico;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerCodigo;
