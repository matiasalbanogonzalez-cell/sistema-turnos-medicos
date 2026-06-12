const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const authRoutes = require("./routes/auth.routes");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
const turnoRoutes = require("./routes/turno.routes");

app.use("/api/turnos", turnoRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Sistema de Turnos Médicos funcionando"
  });
});

module.exports = app;