import config from "../config";

const crearProducto = async ({
  nombre,
  descripcion,
  cantidad,
  codigo,
  medida,
  precioVenta,
  tipoProductoId,
}) => {
  try {
    const response = await fetch(`${config.routeBase}/api/producto/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        cantidad,
        codigo,
        medida,
        precioVenta,
        tipoProductoId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log();

    const responseData = await response.json();

    console.log(JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default crearProducto;
