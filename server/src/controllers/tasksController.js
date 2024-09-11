const { getTasks, addTask, deleteTask } = require("../models/tasksModel");


exports.fetchTasks = async (req, res) => {
    try {
      const tasksData = await getTasks();
      res.status(200).json(tasksData);
    } catch (err) {
      res.status(500).send({ error: err });
    }
};

exports.addTasks = async (req, res) => {
  try {
   
    const result = await addTask(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
  //  console.log(req.params.taskId)
    const result = await deleteTask(req.params.taskId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};