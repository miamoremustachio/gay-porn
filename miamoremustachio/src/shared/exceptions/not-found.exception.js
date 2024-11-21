const HttpException = require('./http.exception');
const { DefaultResponse } = require('../helpers/exception.helper');

const response = new DefaultResponse(404);

class NotFoundException extends HttpException {
  constructor(message = response.message, statusCode = response.statusCode) {
    super(message, statusCode);
  }
}

module.exports = NotFoundException;
