const Turno = require("../models/turno.model");

// 🟢 CREAR TURNO
const crearTurno = async (req, res) => {
  try {
    const turno = new Turno({
      ...req.body,
      userId: req.user.id
    });

    await turno.save();

    res.json({
      message: "Turno creado",
      turno
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear turno"
    });
  }
};

// 🟢 LISTAR TURNOS
const listarTurnos = async (req, res) => {
  try {
    let turnos;

    if (req.user.rol === "admin") {
      turnos = await Turno.find();
    } else {
      turnos = await Turno.find({ userId: req.user.id });
    }

    res.json(turnos);

  } catch (error) {
    res.status(500).json({
      message: "Error al listar turnos"
    });
  }
};

// 🟢 CAMBIAR ESTADO
const cambiarEstadoTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const turno = await Turno.findById(id);

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    if (req.user.rol !== "admin" && turno.userId !== req.user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    turno.estado = estado;

    await turno.save();

    res.json({
      message: "Estado actualizado",
      turno
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al cambiar estado"
    });
  }
};

// 🔥 EXPORT CORRECTO (TODO JUNTO)
module.exports = {
  crearTurno,
  listarTurnos,
  cambiarEstadoTurno
};