const { ReasonPhrases } = require('http-status-codes');

const HttpException = require('./http.exception');

class UnauthorizedException extends HttpException {
  constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = 401) {
    super(message, statusCode);
  }
}

module.exports = UnauthorizedException;
