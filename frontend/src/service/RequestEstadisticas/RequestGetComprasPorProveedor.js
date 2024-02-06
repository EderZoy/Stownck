import config from "../config";

const obtenerComprasPorProveedor = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/compras-proveedor`, {
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

    console.log("Datos obtenidos:", data);

    return data; // Retornamos los tipos de productos obtenidos
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerComprasPorProveedor;
