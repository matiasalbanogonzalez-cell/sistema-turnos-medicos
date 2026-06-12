require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("==================================");
    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    console.log("==================================");
  });
};

startServer();