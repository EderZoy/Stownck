import config from "../config";

const obtenerProveedorPorId = async (id) => {
  try {
    const response = await fetch(`${config.routeBase}/api/proveedor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const proveedor = await response.json();
    return proveedor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default obtenerProveedorPorId;
