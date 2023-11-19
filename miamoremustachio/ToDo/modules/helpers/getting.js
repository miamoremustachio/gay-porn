const { ObjectId } = require('mongodb');

function getAllTasks(collection) {
  const tasksList = collection.find().toArray();
  return tasksList;
}

function getTask(collection, id) {
  const task = collection.findOne({ _id: new ObjectId(id) });
  return task;
}

module.exports = { getAllTasks, getTask };