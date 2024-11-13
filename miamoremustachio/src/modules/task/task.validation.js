const { ForbiddenException, NotFoundException } = require('../../shared/exceptions');

function checkTaskExistence(task, taskId) {
  if (!task) {
    throw new NotFoundException(`Task #${taskId} not found.`);
  }
}

function checkAccess(task, userId) {
  if (!task.userId.equals(userId)) {
    throw new ForbiddenException();
  }
}

module.exports = {
  checkTaskExistence,
  checkAccess,
};
