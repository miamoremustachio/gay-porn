const {
  STATUSES,
  PRIORITIES,
} = require('./modules/constants.js');

const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./modules/checking.js');

const { getTask } = require('./modules/getting.js');
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
  },
  edit({ id, title, status, priority }) {
    const task = getTask(id, this.list);

    if (title) {
      checkTitle(title);
    }

    if (status) {
      checkStatus(status);
    }
    
    if (priority) {
      checkPriority(priority);
    }
    
    task.title = title || task.title;
    task.status = status || task.status;
    task.priority = priority || task.priority;
  },
  delete(id) {
    this.list = this.list.filter(task => task.id !== id);
  }
}

module.exports = { toDo };