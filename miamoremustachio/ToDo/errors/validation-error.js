const CustomError = require('./custom-error.js');

class ValidationError extends CustomError {
  constructor(validatedValue, message) {
    let cause;
    
    if (typeof validatedValue === 'string') {
      cause = `${validatedValue} validation failed: `
    } else {
      cause = 'Validation failed: ';
    }

    super(cause + message);
  }
}

module.exports = ValidationError;