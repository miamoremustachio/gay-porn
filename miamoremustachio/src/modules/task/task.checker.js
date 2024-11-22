const { ForbiddenException, NotFoundException } = require('../../shared/exceptions');

class TaskChecker {
  checkExistence(task, taskId) {
    if (!task) {
      throw new NotFoundException(`Task #${taskId} not found.`);
    }
  }
  
  checkAccess(task, userId) {
    if (!task.userId.equals(userId)) {
      throw new ForbiddenException();
    }
  }
}

module.exports = TaskChecker;
