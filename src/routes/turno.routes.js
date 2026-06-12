const express = require("express");
const router = express.Router();

const turnoController = require("../controllers/turno.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, turnoController.crearTurno);
router.get("/", authMiddleware, turnoController.listarTurnos);
router.put("/:id/estado", authMiddleware, turnoController.cambiarEstadoTurno);

module.exports = router;