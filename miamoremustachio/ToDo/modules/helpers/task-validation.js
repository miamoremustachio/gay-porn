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

const checkTask = {
  title(title) {
    if (!title) {
      throw new Error(MISSING_TITLE);
    }
    
    if (title.length < MIN || title.length > MAX) {
      throw new Error(INVALID_TITLE);
    }
  },
  status(status) {
    const statuses = Object.values(STATUSES);
    
    if (!statuses.includes(status)) {
      throw new Error(INVALID_STATUS);
    }
  },
  priority(priority) {
    const priorities = Object.values(PRIORITIES);
      
    if (!priorities.includes(priority)) {
      throw new Error(INVALID_PRIORITY);
    }
  },
  deadline(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    
    if (deadlineDate < currentDate) {
      throw new Error(INVALID_DEADLINE);
    }
  },
  all(fields) {
    for (const field in fields) {
      if (this[field]) {
        this[field](fields[field]);
      }
    }
  }
}

module.exports = { checkTask };