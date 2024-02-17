const validator = require('validator');

const { BaseValidator } = require('../validators/base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

class TaskValidationError extends ValidationError {
  constructor(message) {
    const entity = 'Task';
    super(message, entity);
  }
}

class TaskValidator extends BaseValidator {
  constructor() {
    super();

    this.messages = {
      title: 'Invalid title: unacceptable string length.',
      deadline: 'Invalid deadline: the deadline date can\'t be earlier than the current date.',
    };
  }

  title(title) {
    title = title.toString();
    
    const isLengthInvalid = !validator.isLength(title, { min: 3, max: 70 });
    
    if (isLengthInvalid) {
      throw new TaskValidationError(this.messages.title);
    }
  }

  deadline(deadline) {
    const deadlineDate = Date.parse(deadline);
    const currentDate = Date.now();
    
    if (deadlineDate < currentDate) {
      throw new TaskValidationError(this.messages.deadline);
    }
  }
}

module.exports = { TaskValidator };