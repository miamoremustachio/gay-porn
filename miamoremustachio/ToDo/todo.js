const {
  STATUSES,
  PRIORITIES,
} = require('./modules/constants.js');

const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./modules/checking.js');

const { tasks: database } = require('./modules/database/collections.js');

const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;

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
    
    database.insertOne(task);
  }
}

module.exports = { toDo };