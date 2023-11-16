const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const { MIN, MAX } = TITLE_LENGTH;
const {
  INVALID_TITLE,
  INVALID_STATUS,
  INVALID_PRIORITY,
  INCORRECT_TITLE_LENGTH,
} = ERROR_MESSAGES;

function checkTitle(title) {
  if (typeof title !== 'string') {
    throw new Error(INVALID_TITLE);
  }
  
  if (title.length < MIN || title.length > MAX) {
    throw new Error(INCORRECT_TITLE_LENGTH);
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

module.exports = {
  checkTitle,
  checkStatus,
  checkPriority,
};