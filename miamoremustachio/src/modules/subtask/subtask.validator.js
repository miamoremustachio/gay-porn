const { NotFoundException } = require('../../shared/exceptions');
const { TaskValidator } = require('../task');

class SubtaskValidator extends TaskValidator {
  checkSubtaskExistence(subtask, subtaskId) {
    if (!subtask) {
      throw new NotFoundException(`Subtask #${subtaskId} not found.`);
    }
  }
}

module.exports = SubtaskValidator;
