import config from "../config";

const obtenerProductoPorId = async (id) => {
  try {
    const response = await fetch(`${config.routeBase}/api/producto/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

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

export default obtenerProductoPorId;
