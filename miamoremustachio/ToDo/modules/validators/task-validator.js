const { BaseValidator } = require('../validators/base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

// #ToDo: move constants to validator files
const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
} = require('../helpers/constants.js');

class TaskValidationError extends ValidationError {
  constructor(message) {
    const entity = 'Task';
    super(message, entity);
  }
}

const { MIN, MAX } = TITLE_LENGTH;

const {
  TO_DO,
  IN_PROGRESS,
  DONE,
} = STATUSES;

const {
  LOW,
  HIGH,
} = PRIORITIES;

class TaskValidator extends BaseValidator {
  constructor() {
    super();
    this.messages = {
      title: `Invalid title (only strings between ${MIN} and ${MAX} characters are allowed).`,
      status: `Invalid status (allowed status values: "${TO_DO}", "${IN_PROGRESS}", "${DONE}").`,
      priority: `Invalid priority (allowed priority values: "${LOW}", "${HIGH}").`,
      deadline: `Invalid deadline (the deadline date can't be earlier than the current date).`,
    };
  }

  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new TaskValidationError(this.messages.title);
    }
  }

  status(status) {
    const statuses = Object.values(STATUSES);
    
    if (!statuses.includes(status)) {
      throw new TaskValidationError(this.messages.status);
    }
  }

  priority(priority) {
    const priorities = Object.values(PRIORITIES);
      
    if (!priorities.includes(priority)) {
      throw new TaskValidationError(this.messages.priority);
    }
  }

  deadline(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    
    if (deadlineDate < currentDate) {
      throw new TaskValidationError(this.messages.deadline);
    }
  }
};

module.exports = { TaskValidator };