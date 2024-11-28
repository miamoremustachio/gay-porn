const {
  STATUSES,
  PRIORITIES,
} = require('./constants.js');

const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;

function Task({ title, status, priority }) {
  this.title = title;
  this.status = status || TO_DO;
  this.priority = priority || LOW;
}

function UpdatedTask({ id, title, status, priority }) {
  this.id = id;
  
  if (title) {
    this.title = title;
  }

  if (status) {
    this.status = status;
  }
  
  if (priority) {
    this.priority = priority;
  }
}

module.exports = { Task, UpdatedTask };