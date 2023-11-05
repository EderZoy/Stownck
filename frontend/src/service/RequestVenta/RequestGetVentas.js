import config from "../config";

const obtenerVentas = async ({ currentPage }) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/venta?page=${currentPage}`,
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

    const ventas = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(ventas));

    return ventas; // Retornamos
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerVentas;
