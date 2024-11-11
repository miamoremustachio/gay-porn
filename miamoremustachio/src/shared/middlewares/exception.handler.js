const HttpException = require('../exceptions/http.exception');

function exceptionHandler(err, req, res, next) {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json(err.response);
  }

  next(err);
}

module.exports = exceptionHandler;
