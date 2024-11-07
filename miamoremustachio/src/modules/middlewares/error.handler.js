const HttpException = require('../exceptions/http.exception');
const ErrorResponse = require('../helpers/error.helper');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json(err.response);
  }

  res.status(err.statusCode || 500).json(new ErrorResponse(err));
}

module.exports = errorHandler;
