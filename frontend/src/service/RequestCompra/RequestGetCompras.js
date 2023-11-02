import config from "../config";

const obtenerCompras = async ({ currentPage }) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/compra?page=${currentPage}`,
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

    const compras = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(compras));

    return compras; // Retornamos
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerCompras;
