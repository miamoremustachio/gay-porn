const { body, validationResult } = require('express-validator');

const Binder = require('../../shared/helpers/bind.helper');
const BadRequestException = require('../../shared/exceptions/bad-request.exception');
const { TEXT_TO_NUMERIC } = require('./task.const');

class TaskValidator {
  constructor() {
    new Binder().bind(this);
  }

  validateBody() {
    return [
      body('title').isAscii(),
      body('priority').customSanitizer(TEXT_TO_NUMERIC),
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

module.exports = TaskValidator;
