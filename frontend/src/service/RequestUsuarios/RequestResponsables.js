import config from "../config";

const obtenerUsuarios = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/usuario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const usuarios = await response.json(); // Parseamos la respuesta como JSON

    console.log(JSON.stringify(usuarios));

    return usuarios; // Retornamos los proveedores
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerUsuarios;
