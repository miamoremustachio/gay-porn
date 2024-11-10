const HttpException = require('./http.exception');

class BadRequestException extends HttpException {
  constructor(message, statusCode = 400) {
    super(message, statusCode);
  }
}

module.exports = BadRequestException;
