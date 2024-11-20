const { NotFoundException } = require('../../shared/exceptions');

class UserValidator {
  checkExistence(user, userId) {
    if (!user) {
      throw new NotFoundException(`User #${userId} not found.`);
    }
  }
}

module.exports = UserValidator;
