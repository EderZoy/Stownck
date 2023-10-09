const jwt = require("jsonwebtoken");
const claveSecreta = require("../config/claveSecreta");

const authMiddleware = (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  const token = req.header("x-auth-token");

  // Si no se proporciona el token, se responde con un error
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    // se verifica la validez del token
    console.log(token);
    console.log(claveSecreta);
    console.log(jwt.verify(token, claveSecreta));

    const decoded = jwt.verify(token, claveSecreta);

    console.log(decoded);

    // se añade la información del usuario a la solicitud para su uso posterior
    req.usuario = decoded.usuario;

    // Continúa con la ejecución del siguiente middleware o ruta
    next();
  } catch (error) {
    // Si el token no es válido,se  responde con un error
    console.error(error);
    res.status(401).json({ error: "Token no válido" });
  }
};

module.exports = authMiddleware;
