const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/auth.routes");
const turnoRoutes = require("./routes/turno.routes");
const profesionalRoutes = require("./routes/profesional.routes");

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/turnos", turnoRoutes);
app.use("/api/profesionales", profesionalRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Sistema de Turnos Médicos funcionando"
  });
});

module.exports = app;