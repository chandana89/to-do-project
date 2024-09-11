const { getTasks } = require("../models/tasksModel");


exports.fetchTasks = async (req, res) => {
    try {
      const tasksData = await getTasks();
      res.status(200).json(tasksData);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  };