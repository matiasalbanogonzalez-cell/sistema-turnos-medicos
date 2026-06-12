const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const generateToken = require("../utils/jwt");

const register = async (data) => {
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.create({
    ...data,
    password: hashedPassword,
  });

  const token = generateToken(user);

  const userResponse = {
    id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
  };

  return {
    user: userResponse,
    token,
  };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken(user);

  const userResponse = {
    id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
  };

  return {
    user: userResponse,
    token,
  };
};

module.exports = {
  register,
  login,
};