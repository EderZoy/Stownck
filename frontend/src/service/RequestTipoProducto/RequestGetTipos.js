import config from "../config";

const obtenerTipos = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/tipos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tiposProductos = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(tiposProductos));

    return tiposProductos; // Retornamos los tipos de productos obtenidos
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerTipos;
