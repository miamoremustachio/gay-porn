const { tasks } = require('./database/collections.js');

function getAllTasks() {
  const tasksList = tasks.find().toArray();
  return tasksList;
}

function getTask(id, toDoList) {
  const task = toDoList.find(task => task.id === id);
  return task;
}

module.exports = { getAllTasks, getTask };