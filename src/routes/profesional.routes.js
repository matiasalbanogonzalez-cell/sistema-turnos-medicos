const express = require("express");
const router = express.Router();

const profesionales = [
  {
    id: 1,
    nombre: "Dr. Carlos Gómez",
    especialidad: "Clínica Médica",
    matricula: "12345",
    consultorio: "2"
  },
  {
    id: 2,
    nombre: "Dra. Laura Ruiz",
    especialidad: "Pediatría",
    matricula: "98765",
    consultorio: "5"
  },
  {
    id: 3,
    nombre: "Dra Malena Gonzalez",
    especialidad: "Cardiología",
    matricula: "12345",
    consultorio: "2"
  },
  {
    id: 4,
    nombre: "Dr. Juan Pérez",
    especialidad: "Neurología",
    matricula: "54321",
    consultorio: "3"
  },
  {
    id: 5,
    nombre: "Dr. Matias Pérez",
    especialidad: "Neurología",
    matricula: "54321",
    consultorio: "4"
  }
];

// 👇 VER TODOS
router.get("/", (req, res) => {
  res.json(profesionales);
});

// 👇 CREAR NUEVO PROFESIONAL
router.post("/", (req, res) => {
  const nuevo = {
    id: profesionales.length + 1,
    nombre: req.body.nombre,
    especialidad: req.body.especialidad,
    matricula: req.body.matricula,
    consultorio: req.body.consultorio
  };

  profesionales.push(nuevo);

  res.status(201).json(nuevo);
});

module.exports = router;