const { NotFoundException } = require('../../shared/exceptions');

class PlanChecker {
  checkExistence(plan, planId) {
    if (!plan) {
      throw new NotFoundException(`Plan #${planId} not found.`);
    }
  }
}

module.exports = PlanChecker;
