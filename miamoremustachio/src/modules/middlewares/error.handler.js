const { BSONError } = require('bson');

const HttpException = require('../exceptions/http.exception');
const ErrorResponse = require('../helpers/error.helper');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json(err.response);
  }

  if (err instanceof BSONError) {
    return res.status(400).json(new ErrorResponse(err, 400));
  }

  res.status(err.statusCode || 500).json(new ErrorResponse(err));
}

module.exports = errorHandler;
