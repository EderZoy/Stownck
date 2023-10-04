const routeBase = "http://192.168.0.195:3000";

const authenticate = async (nombre, contraseña) => {
  try {
    const response = await fetch(routeBase + "/api/usuario/validar-usuario", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        contraseña,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.status; // Parseamos la respuesta como JSON

    console.log(JSON.stringify(responseData));

    return responseData; // Retornamos la respuesta del servidor
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authenticate;
