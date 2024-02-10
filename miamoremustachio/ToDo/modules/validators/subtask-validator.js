const { BaseValidator } = require('../validators/base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');
const { TITLE_LENGTH } = require('../helpers/constants.js');

const { MIN, MAX } = TITLE_LENGTH;

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
    if (title.length < MIN || title.length > MAX) {
      throw new SubtaskValidationError(this.messages.title);
    }
  }
};

module.exports = { SubtaskValidator };