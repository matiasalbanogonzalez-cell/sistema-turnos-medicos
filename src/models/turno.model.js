const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  paciente: {
    type: String,
    required: true
  },

  profesionalId: {
    type: String,
    required: true
  },

  especialidad: {
    type: String,
    required: true
  },

  fecha: {
    type: String,
    required: true
  },

  hora: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    enum: ["pendiente", "confirmado", "cancelado"],
    default: "pendiente"
  },

  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Turno", turnoSchema);