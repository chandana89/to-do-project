const mysql = require("mysql2");
require("dotenv").config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE,
});

// Establish a connection to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
