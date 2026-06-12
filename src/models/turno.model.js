const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  paciente: String,
  profesional: String,
  especialidad: String,
  fecha: String,
  userId: String,

  estado: {
    type: String,
    default: "pendiente"
  }
});

module.exports = mongoose.model("Turno", turnoSchema);