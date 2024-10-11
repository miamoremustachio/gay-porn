class BaseValidator {
  all(fields) {
    for (const field in fields) {
      if (this[field]) {
        this[field](fields[field]);
      }
    }
  }
}

module.exports = { BaseValidator };