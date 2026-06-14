const Turno = require("../models/turno.model");

// 🟢 CREAR TURNO
const crearTurno = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { paciente, profesionalId, especialidad, fecha, hora } = req.body;

    if (!paciente || !profesionalId || !especialidad || !fecha || !hora) {
      return res.status(400).json({
        message: "Faltan campos requeridos: paciente, profesionalId, especialidad, fecha, hora"
      });
    }

    const turno = new Turno({
      paciente,
      profesionalId,
      especialidad,
      fecha,
      hora,
      estado: "pendiente",
      userId: req.user.id
    });

    await turno.save();

    res.status(201).json({
      message: "Turno creado",
      turno
    });

  } catch (error) {
    console.log("ERROR CREAR TURNO:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

// 🟢 LISTAR TURNOS (ADMIN VE TODO / PACIENTE SOLO LOS SUYOS)
const listarTurnos = async (req, res) => {
  try {
    let turnos;

    console.log("USER LOGUEADO:", req.user);

    if (req.user.rol === "admin") {
      turnos = await Turno.find();
    } else {
      turnos = await Turno.find({ userId: req.user.id });
    }

    res.json(turnos);

  } catch (error) {
    console.log("ERROR LISTAR TURNOS:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

// 🟢 CAMBIAR ESTADO DE TURNO
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
    console.log("ERROR CAMBIAR ESTADO:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

// 🔥 EXPORT FINAL
module.exports = {
  crearTurno,
  listarTurnos,
  cambiarEstadoTurno
};