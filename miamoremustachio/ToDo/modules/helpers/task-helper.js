const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  DEFAULT_SORT_ORDER,
  ERROR_MESSAGES,
} = require('./constants.js');

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

function getDefaultDeadline() {
  const taskCreationTime = new Date();
  const deadlineMonth = taskCreationTime.getMonth() + 1;
  const deadline = new Date(taskCreationTime.setMonth(deadlineMonth));

  return deadline;
}

// #ToDo: add date-fns package
function getNextDay() {
  const currentTime = new Date();
  const nextDay = currentTime.getDate() + 1;
  const nextDayDate = new Date(currentTime.setDate(nextDay));
  const nextDayStarting = new Date(nextDayDate.toDateString());

  return nextDayStarting;
}

function getNextWeek() {
  const currentTime = new Date();
  const nextWeek = currentTime.getDate() + 7;
  const nextWeekStarting = new Date(currentTime.setDate(nextWeek));

  return nextWeekStarting;
}

function getDateLimit(deadline) {
  switch (deadline) {
    case 'today':
      return getNextDay();
    case 'week':
      return getNextWeek();
  }
}

function SortField(field, order) {
  this[field] = order || DEFAULT_SORT_ORDER;
}

function Task({ title, status, priority, deadline, userId, subtasks }) {
  this.title = title;
  this.status = status;
  this.priority = priority;
  this.deadline = deadline;
  this.user = userId;

  if (subtasks) {
    this.subtasks = subtasks;
  }
}

function UpdatedTask({ title, status, priority, deadline }) {
// #ToDo: create for/in loop for adding properties
  if (title) {
    this.title = title;
  }

  if (status) {
    this.status = status;
  }
  
  if (priority) {
    this.priority = priority;
  }

  if (deadline) {
    this.deadline = deadline;
  }
}

module.exports = {
  checkTitle,
  checkStatus,
  checkTaskProperties,
  getDefaultDeadline,
  getDateLimit,
  SortField,
  Task,
  UpdatedTask,
};