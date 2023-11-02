import config from "../config";

const crearProveedor = async ({ nombre, descripcion, telefono }) => {
  try {
    const response = await fetch(`${config.routeBase}/api/proveedor/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        telefono,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    console.log(JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default crearProveedor;
