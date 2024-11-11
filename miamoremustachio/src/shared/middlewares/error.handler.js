const { BSONError } = require('bson');

const ErrorResponse = require('../helpers/error.helper');

function errorHandler(err, req, res, next) {
  if (err instanceof BSONError) {
    return res.status(400).json(new ErrorResponse(err, 400));
  }

  res.status(err.statusCode || 500).json(new ErrorResponse(err));
}

module.exports = errorHandler;
