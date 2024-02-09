const { ClientError } = require('./client-error.js');

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { NotFoundError };