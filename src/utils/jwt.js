const env = require("../config/env");
const jwt = require("jsonwebtoken");

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el entorno");
}

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      rol: user.rol,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN || "1d",
    }
  );
};

module.exports = generateToken;