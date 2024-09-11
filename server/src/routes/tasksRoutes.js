const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");

router.get("/view", tasksController.fetchTasks);
router.post("/add", tasksController.addTasks);
router.delete("/delete/:taskId", tasksController.deleteTaskById);

module.exports = router;