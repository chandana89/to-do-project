const db = require("../configs/db");

async function getTasks() {
  try {
    const query = "SELECT * FROM Tasks";
    const [results] = await db.promise().query(query);
    // console.log(results);
    return results;
  } catch (error) {
    throw new Error("error fetching tasks");
  }
}

async function addTask(data) {
  try {
    // console.log(data)
    let taskQuery;
    let taskValues;
    if(data?.taskId){
      taskQuery = `UPDATE
      Tasks SET Title = ?, Description = ?, Status = ? WHERE TaskID = ?`;
      taskValues = [data.title, data.description, data.status, data.taskId]
    }else{
      taskQuery = `INSERT INTO 
        Tasks (Title, Description, Status)
        VALUES (?,?,?)`;
      taskValues = [data.title, data.description, data.status]
      
    }
    const taskResults = await db.promise().query(taskQuery, taskValues);
    if (taskResults[0].affectedRows > 0) {
      return "Added Task successfully!!"
    }else{
      throw new Error("Error while adding task");
    }
  } catch (error) {
    throw new Error("Error adding task", error);
  }
}

async function deleteTask(taskId) {
  try {
    const taskQuery = `DELETE FROM Tasks WHERE TaskID = ?`;
    const taskValues = [taskId]
    const taskResults = await db.promise().query(taskQuery, taskValues);
    if (taskResults[0].affectedRows > 0) {
      return "Deleted Task successfully!!"
    }else{
      throw new Error("Error while deleting new task");
    }
  } catch (error) {
    throw new Error("Error deleting new task", error);
  }
}

async function getTask(taskId) {
  try {
    // console.log(taskId)
    const taskQuery = `SELECT * FROM Tasks WHERE TaskID = ?`;
    const taskValues = [taskId]
    const [taskResults] = await db.promise().query(taskQuery, taskValues);
    // console.log(taskResults)
    return taskResults;
  } catch (error) {
    throw new Error("Error deleting new task", error);
  }
}

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    getTask
  };