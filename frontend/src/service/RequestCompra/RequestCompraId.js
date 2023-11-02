import config from "../config";

const obtenerCompraPorId = async (id) => {
  try {
    const response = await fetch(`${config.routeBase}/api/compra/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const compra = await response.json();
    return compra;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerCompraPorId;
