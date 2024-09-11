const env = require("env-var");
require("dotenv").config();

module.exports = {
  SERVER_PORT: env.get("SERVER_PORT").required().asPortNumber(),
  MYSQL_USER: env.get("MYSQL_USER").required().asString(),
  MYSQL_PASSWORD: env.get("MYSQL_PASSWORD").required().asString(),
  MYSQL_DATABASE: env.get("MYSQL_DATABASE").required().asString(),
  MYSQL_HOST: env.get("MYSQL_HOST").required().asString(),
  MYSQL_PORT: env.get("MYSQL_PORT").required().asPortNumber(),
};
