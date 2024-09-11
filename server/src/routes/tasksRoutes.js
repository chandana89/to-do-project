const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");

router.get("/view", tasksController.fetchTasks);

module.exports = router;