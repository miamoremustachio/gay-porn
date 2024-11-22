const { NotFoundException } = require('../../shared/exceptions');
const { TaskChecker } = require('../task');

class SubtaskChecker extends TaskChecker {
  checkSubtaskExistence(subtask, subtaskId) {
    if (!subtask) {
      throw new NotFoundException(`Subtask #${subtaskId} not found.`);
    }
  }
}

module.exports = SubtaskChecker;
