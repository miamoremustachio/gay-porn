const { ClientError } = require('./client-error.js');

class ForbiddenError extends ClientError {
  constructor(message) {
    super(message, 403);
  }
}

module.exports = { ForbiddenError };