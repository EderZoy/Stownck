import config from "./config";

const authenticate = async (nombre, contraseña) => {
  try {
    const response = await fetch(`${config.routeBase}/auth/login`, {
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
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Error en la autenticación");
    }

    const responseData = await response.json();
    console.log(responseData.token);

    localStorage.setItem("token", responseData.token);

    const responseS = await response.status; // Parseamos la respuesta como JSON

    return responseS;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authenticate;
