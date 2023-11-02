import config from "../config";

const obtenerProductos = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const productos = await response.json(); // Parseamos la respuesta como JSON

    console.log(productos);

    return productos; // Retornamos los proveedores
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerProductos;
