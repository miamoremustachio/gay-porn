const { ClientError } = require('./client-error.js');

class ValidationError extends ClientError {
  constructor(message, entity) {
    const cause = (entity) ? `${entity} validation failed: ` : 'Validation failed: '; 

    super(cause + message);
  }
}

module.exports = { ValidationError };