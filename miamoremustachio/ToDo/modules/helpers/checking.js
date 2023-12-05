const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
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

function checkProperties({ title, status, priority, deadline }) {
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

module.exports = {
  checkTitle,
  checkProperties,
};