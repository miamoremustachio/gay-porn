const { BSONError } = require('bson');
const { MongoServerError } = require('mongodb/lib/error');
const ValidationError = require('mongoose/lib/error/validation');
const CastError = require('mongoose/lib/error/cast');

const HttpException = require('../exceptions/http.exception');
const BadRequestException = require('../exceptions/bad-request.exception');

function exceptionHandler(err, req, res, next) {
  switch (true) {
    case err instanceof HttpException: {

      res.status(err.statusCode).json(err.body);
      break;
    }

    case err instanceof BSONError:
    case err instanceof MongoServerError:
    case err instanceof CastError:
    case err instanceof ValidationError: {

      const message = err.message;
      const exception = new BadRequestException(message);

      res.status(exception.statusCode).json(exception.body);
      break;
    }

    default: {
      next(err);
    }
  }
}

module.exports = exceptionHandler;
