import config from "../config";

const obtenerFormasPago = async () => {
  try {
    const response = await fetch(`${config.routeBase}/api/formaspago`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const formasPago = await response.json(); // Parseamos la respuesta como JSON

    console.log(formasPago);

    return formasPago;
  } catch (error) {
    console.error(error);
    console.log(`${localStorage.getItem("token")}`);
    throw error;
  }
};

export default obtenerFormasPago;
