const { isNullish } = require('../helpers/type-helper.js');

class BaseValidator {
  all(fields) {
    for (const field in fields) {
      if (isNullish(fields[field])) {
        continue;
      }

      if (this[field]) {
        this[field](fields[field]);
      }
    }
  }
}

module.exports = { BaseValidator };