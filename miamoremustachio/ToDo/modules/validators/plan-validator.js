const validator = require('validator');

const { BaseValidator } = require('./base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

// #ToDo: get rid of unnecessary error extentions
// by putting entity name in BaseValidator prototype property.
class PlanValidationError extends ValidationError {
  constructor(message) {
    const entity = 'Plan';
    super(message, entity);
  }
}

class PlanValidator extends BaseValidator {
  constructor() {
    super();
    
    this.messages = {
      title: 'Invalid title: unacceptable string length.',
    }
  }

  title(title) {
    title = title.toString();

    const isOutOfRange = !validator.isLength(title, { min: 3, max: 70 });

    if (isOutOfRange) {
      throw new PlanValidationError(this.messages.title);
    }
  }
}

module.exports = { PlanValidator };