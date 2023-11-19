const { ObjectId } = require('mongodb');

const {
  STATUSES,
  PRIORITIES,
} = require('./helpers/constants.js');

const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;

const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./helpers/checking.js');

const { tasks: databaseTasks } = require('./database/collections.js');

function Task(title) {
  this.title = title;
  this.status = TO_DO;
  this.priority = LOW;
}

const toDo = {
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
    
    return databaseTasks.insertOne(task);
  },
  edit({ title, status, priority, id }) {
    const task = {};

    if (title) {
      checkTitle(title);
      task.title = title;
    }

    if (status) {
      checkStatus(status);
      task.status = status;
    }
    
    if (priority) {
      checkPriority(priority);
      task.priority = priority;
    }
    
    return databaseTasks.updateOne(
      { _id: new ObjectId(id) },
      { $set: task }
    );
  },
  delete(id) {
    return databaseTasks.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = { toDo };