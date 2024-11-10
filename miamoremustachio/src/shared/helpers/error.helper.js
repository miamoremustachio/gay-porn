const { HTTP_REASON_PHRASE } = require('../../config/server.config');

const { INTERNAL_SERVER_ERROR } = HTTP_REASON_PHRASE;

function ErrorResponse(err, statusCode) {
  this.statusCode = statusCode || err.statusCode || 500;
  this.message = err.message || INTERNAL_SERVER_ERROR;
}

module.exports = ErrorResponse;
