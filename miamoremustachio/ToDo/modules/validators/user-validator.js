const validator = require('validator');

const { BaseValidator } = require('./base-validator.js');
const { ValidationError } = require('../errors/validation-error.js');

class UserValidationError extends ValidationError {
  constructor(message) {
    const entity = 'User';
    super(message, entity);
  }
}

class UserValidator extends BaseValidator {
  constructor() {
    super();

    this.messages = {
      username: 'Invalid username: unacceptable string length.',
      email: 'Invalid email: received string is not a valid email address.',
    };
  }

  username(username) {
    const isLengthOutOfRange = !validator.isLength(username, { min: 3, max: 15 });
    
    if (isLengthOutOfRange) {
      throw new UserValidationError(this.messages.username);
    }
  }

  email(email) {
    const isEmailInvalid = !validator.isEmail(email);

    if (isEmailInvalid) {
      throw new UserValidationError(this.messages.email);
    }
  }
}

module.exports = { UserValidator };