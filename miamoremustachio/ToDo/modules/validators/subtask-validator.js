const validator = require('validator');

const { BaseValidator } = require('../validators/base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

class SubtaskValidationError extends ValidationError {
  constructor(message) {
    const entity = 'Subtask';
    super(message, entity);
  }
}

class SubtaskValidator extends BaseValidator {
  constructor() {
    super();
    this.messages = {
      title: 'Invalid title: unacceptable string length.',
    };
  }

  title(title) {
    const isLengthInvalid = !validator.isLength(title, { min: 3, max: 70 });

    if (isLengthInvalid) {
      throw new SubtaskValidationError(this.messages.title);
    }
  }
}

module.exports = { SubtaskValidator };