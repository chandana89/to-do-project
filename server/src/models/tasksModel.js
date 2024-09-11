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

module.exports = {
    getTasks
  };