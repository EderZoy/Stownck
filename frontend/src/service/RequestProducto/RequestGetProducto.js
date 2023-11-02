import config from "../config";

const obtenerProductos = async ({ currentPage }) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/producto?page=${currentPage}`,
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

    const productos = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(productos));

    return productos; // Retornamos los tipos de productos obtenidos
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerProductos;
