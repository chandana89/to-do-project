const env = require("env-var");
require("dotenv").config(); // Load environment variables from .env file

// Ensure that NODE_ENV is either "development" or "production"
const nodeEnv = env.get("NODE_ENV").required().asString();

if (nodeEnv !== "development" && nodeEnv !== "production") {
  throw new Error(
    `Invalid NODE_ENV value: ${nodeEnv}. Expected "development" or "production".`
  );
}

const isProduction = nodeEnv === "production";

// Validate and export environment variables
module.exports = {
  SERVER_PORT: env.get("SERVER_PORT").required().asPortNumber(), // Server port for Express
  MYSQL_USER: env.get("MYSQL_USER").required().asString(), // MySQL username
  MYSQL_PASSWORD: isProduction // MySQL password, required in production
    ? env.get("MYSQL_PASSWORD").required().asString()
    : env.get("MYSQL_PASSWORD").asString(),
  MYSQL_DATABASE: env.get("MYSQL_DATABASE").required().asString(), // MySQL database name
  MYSQL_HOST: env.get("MYSQL_HOST").required().asString(), // MySQL host
  MYSQL_PORT: env.get("MYSQL_PORT").required().asPortNumber(), // MySQL port
};
