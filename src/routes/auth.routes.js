const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Bienvenido administrador",
      usuario: req.user
    });
  }
);

module.exports = router;