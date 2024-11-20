const ErrorResponse = require('../helpers/error.helper');

function errorHandler(err, req, res, next) {
  const response = new ErrorResponse(err);

  res.status(response.statusCode).json(response);
}

module.exports = errorHandler;
