const express = require("express");
const app = express();
const cors = require("cors");
const tasksRoutes = require("./src/routes/tasksRoutes.js");
const port = process.env.PORT || 3000;
const db = require("./src/configs/db.js");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/tasks", tasksRoutes);

app.listen(port, ()=>{
    console.log("Server started on port " + port);
});