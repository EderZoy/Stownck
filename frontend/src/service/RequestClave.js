// Realiza una solicitud para obtener la clave secreta desde el backend

const obtenerClaveSecreta = async (token) => {
  try {
    const response = await fetch("http://tu-backend/api/get-secret-key", {
      method: "GET",
      headers: {
        "x-auth-token": token, // token del usuario
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.secretKey;
    } else {
      console.error("Error al obtener la clave secreta");
      return null;
    }
  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
};

module.exports = obtenerClaveSecreta;
