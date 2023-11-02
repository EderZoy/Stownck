import config from "../config";

const obtenerInformacionDelProducto = async (codigo) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto/codigo/${codigo}`,
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

    const producto = await response.json();
    return producto;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerInformacionDelProducto;
