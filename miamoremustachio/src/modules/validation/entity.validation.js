const BadRequestException = require('../exceptions/bad.request.exception');

function validateAllFields(entity, validationLayer) {
  for (let field in entity) {
    const { fn: validateField, message } = validationLayer[field];
    const entityField = entity[field];

    if (!validateField(entityField)) {
      throw new BadRequestException(message);
    }
  }
}

module.exports = { validateAllFields };
