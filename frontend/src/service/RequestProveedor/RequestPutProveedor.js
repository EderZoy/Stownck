import config from "../config";

const actualizarProveedor = async (id, datos) => {
  try {
    const response = await fetch(
      `${config.routeBase}/api/proveedor/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(datos),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el proveedor");
    }

    const proveedorActualizado = await response.json();
    return proveedorActualizado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default actualizarProveedor;
