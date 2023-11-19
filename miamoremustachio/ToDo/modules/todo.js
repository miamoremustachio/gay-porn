const { ObjectId } = require('mongodb');

const { tasks } = require('./database/collections.js');
const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./helpers/checking.js');
const { Task } = require('./helpers/constructors.js');

const toDo = {
  collection: tasks,
  add({ title, status, priority }) {
    checkTitle(title);

    const task = new Task(title);

    if (status) {
      checkStatus(status);
      task.status = status;
    }

    if (priority) {
      checkPriority(priority);
      task.priority = priority;
    }
    
    return this.collection.insertOne(task);
  },
  get(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  },
  getAll() {
    return this.collection.find().toArray();
  },
  edit(task) {
    const { id, ...restProperties } = task;

    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: restProperties }
    );
  },
  delete(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = { toDo };