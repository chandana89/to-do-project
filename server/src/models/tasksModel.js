const db = require("../configs/db");

async function getTasks() {
  try {
    const query = "SELECT * FROM Tasks";
    const [results] = await db.promise().query(query);
    console.log(results);
    return results;
  } catch (error) {
    throw new Error("error fetching tasks");
  }
}

async function addTask(data) {
  try {
    const taskQuery = `INSERT INTO 
      Tasks (Title, Description, Status)
      VALUES (?,?,?)
    `;
    const taskValues = [data.title, data.description, 'pending']
    const [taskResults] = await db.promise().query(taskQuery, taskValues);
    return taskResults;
  } catch (error) {
    throw new Error("Error adding new task", error);
  }
}

module.exports = {
    getTasks,
    addTask
  };