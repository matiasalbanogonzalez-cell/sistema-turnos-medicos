const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const rootEnvPath = path.resolve(__dirname, "..", "..", ".env");
const srcEnvPath = path.resolve(__dirname, "..", ".env");
const envPath = fs.existsSync(rootEnvPath) ? rootEnvPath : srcEnvPath;

const result = dotenv.config({ path: envPath });

if (result.error) {
  throw result.error;
}

const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = process.env;
