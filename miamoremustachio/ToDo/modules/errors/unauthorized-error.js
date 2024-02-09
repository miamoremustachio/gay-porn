const { ClientError } = require('./client-error.js');

class UnauthorizedError extends ClientError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = { UnauthorizedError };