const { tasks } = require('./database/collections.js');

function getAllTasks() {
  const tasksList = tasks.find().toArray();
  return tasksList;
}

module.exports = { getAllTasks };