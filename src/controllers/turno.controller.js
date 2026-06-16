const Turno = require("../models/turno.model");
const crearTurno = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      paciente,
      profesionalId,
      especialidad,
      fecha,
      hora,
      obraSocial
    } = req.body;

    if (!paciente || !profesionalId || !especialidad || !fecha || !hora || !obraSocial) {
      return res.status(400).json({
        message: "Faltan campos requeridos"
      });
    }

    const turno = new Turno({
      paciente,
      profesionalId,
      especialidad,
      fecha,
      hora,
      obraSocial,
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
// LISTAR TURNOS
const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CAMBIAR ESTADO
const cambiarEstadoTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const turno = await Turno.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!turno) {
      return res.status(404).json({
        message: "Turno no encontrado"
      });
    }

    res.json(turno);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  crearTurno,
  listarTurnos,
  cambiarEstadoTurno
};