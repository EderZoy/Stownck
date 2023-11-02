import config from "../config";

const obtenerProveedores = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/proveedores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const proveedores = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(proveedores));

    return proveedores; // Retornamos los proveedores
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerProveedores;
