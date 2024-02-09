const { ValidationError } = require('../errors/validation-error.js');

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
  INVALID_DEADLINE,
} = ERROR_MESSAGES;

const checkTask = {
  entity: 'Task',
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new ValidationError(INVALID_TITLE, this.entity);
    }
  },
  status(status) {
    const statuses = Object.values(STATUSES);
    
    if (!statuses.includes(status)) {
      throw new ValidationError(INVALID_STATUS, this.entity);
    }
  },
  priority(priority) {
    const priorities = Object.values(PRIORITIES);
      
    if (!priorities.includes(priority)) {
      throw new ValidationError(INVALID_PRIORITY, this.entity);
    }
  },
  deadline(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    
    if (deadlineDate < currentDate) {
      throw new ValidationError(INVALID_DEADLINE, this.entity);
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