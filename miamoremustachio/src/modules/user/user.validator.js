const { body, validationResult } = require('express-validator');

const UserEntity = require('./user.entity');
const Binder = require('../../shared/helpers/bind.helper');
const BadRequestException = require('../../shared/exceptions/bad-request.exception');

class UserValidator {
  constructor(userPaths = Object.keys(UserEntity.schema.paths)) {
    this.paths = userPaths;

    new Binder().bind(this);
  }

  validateBody() {
    return [
      body('username').isAlphanumeric('en-US', { ignore: ' '}),
      body('email').isEmail(),
      this.processValidationResult,
    ];
  }

  processValidationResult(req, res, next) {
    const result = validationResult(req);
    
    if (result.isEmpty()) {
      next();
      return;
    }

    throw new BadRequestException(...Array(2), result.array());
  }
}

module.exports = UserValidator;
