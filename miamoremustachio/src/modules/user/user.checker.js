const { NotFoundException } = require('../../shared/exceptions');

class UserChecker {
  checkExistence(user, userId) {
    if (!user) {
      throw new NotFoundException(`User #${userId} not found.`);
    }
  }
}

module.exports = UserChecker;
