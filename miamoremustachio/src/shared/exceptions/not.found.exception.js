const HttpException = require('./http.exception');

class NotFoundException extends HttpException {
  constructor(message, statusCode = 404) {
    super(message, statusCode);
  }
}

module.exports = NotFoundException;
