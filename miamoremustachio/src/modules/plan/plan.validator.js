const { NotFoundException } = require('../../shared/exceptions');

class PlanValidator {
  checkExistence(plan, planId) {
    if (!plan) {
      throw new NotFoundException(`Plan #${planId} not found.`);
    }
  }
}

module.exports = PlanValidator;
