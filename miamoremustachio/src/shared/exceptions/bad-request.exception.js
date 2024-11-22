const HttpException = require('./http.exception');
const { DefaultResponse } = require('../helpers/exception.helper');

const response = new DefaultResponse(400);

class BadRequestException extends HttpException {
  constructor(message = response.message, statusCode = response.statusCode, details) {
    super(message, statusCode);

    this.details = details;
  }
}

module.exports = BadRequestException;
