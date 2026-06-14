const express = require("express");
const router = express.Router();

const turnoController = require("../controllers/turno.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// � LISTAR TURNOS (admin ve todo, paciente solo los suyos)
router.get("/", authMiddleware, turnoController.listarTurnos);

// 🔐 CREAR TURNO
router.post("/", authMiddleware, turnoController.crearTurno);

// 🔐 CAMBIAR ESTADO
router.put("/:id", authMiddleware, turnoController.cambiarEstadoTurno);

module.exports = router;