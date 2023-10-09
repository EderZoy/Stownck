const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// para manejar la authenticacion
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const claveSecreta = require("../config/claveSecreta"); // se importa la clave secreta

const Usuario = sequelize.define("Usuario", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  contraseña: { type: DataTypes.STRING, allowNull: false },
});

// Antes de guardar el usuario, hashea la contraseña
Usuario.beforeCreate(async (usuario) => {
  usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
});

// Método para comparar contraseñas
Usuario.prototype.validarContraseña = async function (contraseña) {
  return bcrypt.compare(contraseña, this.contraseña);
};

// Método para generar un token de autenticación
Usuario.prototype.generarToken = function () {
  try {
    // Asegúrate de que this.id esté disponible y sea válido
    if (!this.id) {
      console.log(this.id);
      throw new Error("El usuario no tiene un ID válido.");
    }
    console.log(this.id);
    const token = jwt.sign({ id: this.id, nombre: this.nombre }, claveSecreta, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    // Maneja cualquier error durante la generación del token
    console.error("Error al generar el token:", error);
    throw error;
  }
};

module.exports = Usuario;
