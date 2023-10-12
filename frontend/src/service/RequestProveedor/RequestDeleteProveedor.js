import config from "../config";

const deleteProveedor = async (id) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/proveedor/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      // Manejar errores, por ejemplo, lanzar una excepción con un mensaje de error
      throw new Error(`Error al eliminar el proveedor: ${response.status}`);
    }
    const proveedorEliminado = await response.json();
    return proveedorEliminado;
  } catch (error) {
    // Manejar el error, puedes lanzar una excepción o devolver un objeto con información del error
    console.error("Error en la solicitud DELETE:", error.message);
    throw error;
  }
};

export default deleteProveedor;
