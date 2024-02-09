const { ClientError } = require('./client-error.js');

class ValidationError extends ClientError {
  constructor(message, validatedValue) {
    let cause;
    
    if (typeof validatedValue === 'string') {
      cause = `${validatedValue} validation failed: `
    } else {
      cause = 'Validation failed: ';
    }

    super(cause + message);
  }
}

module.exports = { ValidationError };