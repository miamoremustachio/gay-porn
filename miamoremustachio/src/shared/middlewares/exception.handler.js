const ValidationError = require('mongoose/lib/error/validation');

const HttpException = require('../exceptions/http.exception');
const BadRequestException = require('../exceptions/bad.request.exception');

function exceptionHandler(err, req, res, next) {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json(err.body);
  }

  if (err instanceof ValidationError) {
    const message = Object.values(err.errors)[0].properties.message;
    const exception = new BadRequestException(message);
    return res.status(exception.statusCode).json(exception.body);
  }

  next(err);
}

module.exports = exceptionHandler;
