const HttpException = require('./http.exception');
const BadRequestException = require('./bad-request.exception');
const UnauthorizedException = require('./unauthorized.exception');
const ForbiddenException = require('./forbidden.exception');
const NotFoundException = require('./not-found.exception');

module.exports = {
  HttpException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
};
