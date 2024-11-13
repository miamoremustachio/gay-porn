const HttpException = require('./http.exception');
const { DefaultResponse } = require('./exception.helper');

const response = new DefaultResponse(401);

class UnauthorizedException extends HttpException {
  constructor(message = response.message, statusCode = response.statusCode) {
    super(message, statusCode);
  }
}

module.exports = UnauthorizedException;
