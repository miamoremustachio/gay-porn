const { BaseValidator } = require('../validators/base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

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

class TaskValidator extends BaseValidator {
  constructor() {
    super();
    this.messages = {
      title: 'Invalid title: unacceptable string length.',
      status: 'Invalid status: received value doesn\'t match any of the allowed status fields.',
      priority: 'Invalid priority: received value doesn\'t match any of the allowed priority fields.',
      deadline: 'Invalid deadline: the deadline date can\'t be earlier than the current date.',
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