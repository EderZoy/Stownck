import config from "./config";

const obtenerTipoProductoPorId = async (id) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/tipo-producto/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tipoProducto = await response.json();
    return tipoProducto;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerTipoProductoPorId;
