const {
  STATUSES,
  PRIORITIES,
} = require('./constants.js');

const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./checking.js');

const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;

function Task(title) {
  this.title = title;
  this.status = TO_DO;
  this.priority = LOW;
}

function FilteredTask({ id, title, status, priority }) {
  this.id = id;

  if (title) {
    checkTitle(title);
    this.title = title;
  }

  if (status) {
    checkStatus(status);
    this.status = status;
  }
  
  if (priority) {
    checkPriority(priority);
    this.priority = priority;
  }
}

module.exports = { Task, FilteredTask };