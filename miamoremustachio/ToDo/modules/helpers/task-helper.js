const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  DEFAULT_SORT_ORDER,
  ERROR_MESSAGES,
} = require('./constants.js');

const { Task: taskModel } = require('../models/task-model.js');

const { MIN, MAX } = TITLE_LENGTH;
const {
  MISSING_TITLE,
  INVALID_TITLE,
  INVALID_STATUS,
  INVALID_PRIORITY,
  INVALID_DEADLINE,
} = ERROR_MESSAGES;

function checkTitle(title) {
  if (!title) {
    throw new Error(MISSING_TITLE);
  }
  
  if (title.length < MIN || title.length > MAX) {
    throw new Error(INVALID_TITLE);
  }
}

function checkStatus(status) {
  const statuses = Object.values(STATUSES);

  if (!statuses.includes(status)) {
    throw new Error(INVALID_STATUS);
  }
}

function checkPriority(priority) {
  const priorities = Object.values(PRIORITIES);
    
  if (!priorities.includes(priority)) {
    throw new Error(INVALID_PRIORITY);
  }
}

// #ToDo: fix deadline checking
function checkDeadline(deadline) {
  const currentDate = new Date();

  if (deadline < currentDate) {
    throw new Error(INVALID_DEADLINE);
  }
}

function checkTaskProperties({ title, status, priority, deadline }) {
  if (title) {
    checkTitle(title);
  }

  if (status) {
    checkStatus(status);
  }

  if (priority) {
    checkPriority(priority);
  }

  if (deadline) {
    checkDeadline(deadline);
  }
}

function SortField(field, order) {
  this[field] = order || DEFAULT_SORT_ORDER;
}

function getTaskPaths() {
  return Object.keys(taskModel.schema.paths);
}

function Task(fields) {
  const taskPaths = getTaskPaths();

  for (const field in fields) {
    if (taskPaths.includes(field)) {
      this[field] = fields[field];
    }
  }

  if (fields.user) {
    this.user = fields.user;
  }
}

module.exports = {
  checkTitle,
  checkStatus,
  checkTaskProperties,
  SortField,
  Task,
};