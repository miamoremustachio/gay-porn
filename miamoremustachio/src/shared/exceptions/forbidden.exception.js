const HttpException = require('./http.exception');
const { DefaultResponse } = require('./exception.helper');

const response = new DefaultResponse(403);

class ForbiddenException extends HttpException {
  constructor(message = response.message, statusCode = response.statusCode) {
    super(message, statusCode);
  }
}

module.exports = ForbiddenException;
