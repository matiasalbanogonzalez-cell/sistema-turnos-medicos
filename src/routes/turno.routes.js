const express = require("express");
const router = express.Router();

const turnoController = require("../controllers/turno.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Listar turnos
router.get("/", authMiddleware, turnoController.listarTurnos);

// Crear turno
router.post("/", authMiddleware, turnoController.crearTurno);

// Cambiar estado
router.put("/:id", authMiddleware, turnoController.cambiarEstadoTurno);

module.exports = router;