const express = require("express");
const app = express();
const cors = require("cors");
const tasksRoutes = require("./src/routes/tasksRoutes.js");

// Set the port
const port = process.env.PORT || 3000;

// Import database configuration
const db = require("./src/configs/db.js");

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for specific origin with credentials
app.use(express.json()); // Parse incoming JSON requests

app.use("/tasks", tasksRoutes);

app.listen(port, ()=>{
    console.log("Server started on port " + port);
});