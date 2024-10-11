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
      age: {
        type: 'Invalid age: value is not integer.',
        range: 'Invalid age: value is outside the acceptable age range.',
      },
      email: 'Invalid email: received string is not a valid email address.',
    };
  }

  username(username) {
    username = username.toString();

    const isOutOfRange = !validator.isLength(username, { min: 3, max: 15 });
    
    if (isOutOfRange) {
      throw new UserValidationError(this.messages.username);
    }
  }

  age(age) {
    age = age.toString();

    const isNotInteger = !validator.isInt(age);

    if (isNotInteger) {
      throw new UserValidationError(this.messages.age.type);
    }
    const isOutOfRange = !validator.isInt(age, { min: 7, max: 120 });

    if (isOutOfRange) {
      throw new UserValidationError(this.messages.age.range);
    }
  }

  email(email) {
    email = email.toString();
    
    const isInvalid = !validator.isEmail(email);

    if (isInvalid) {
      throw new UserValidationError(this.messages.email);
    }
  }
}

module.exports = { UserValidator };