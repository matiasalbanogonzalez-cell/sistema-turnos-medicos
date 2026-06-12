const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("=== AUTH MIDDLEWARE ===");
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado. Token no proporcionado."
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Usuario decodificado:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("ERROR JWT:", error);

    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = authMiddleware;