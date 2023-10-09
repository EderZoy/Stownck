const crypto = require("crypto");

// Genera una clave secreta aleatoria de 32 bytes (256 bits)
const claveSecreta = crypto.randomBytes(32).toString("hex");

// Actualiza el archivo de almacenamiento con la nueva clave
const fs = require("fs");
fs.writeFileSync(
  "./src/config/claveSecreta.js",
  `module.exports = '${claveSecreta}';`
);

console.log("Clave secreta generada y almacenada:", claveSecreta);

module.exports = claveSecreta;
