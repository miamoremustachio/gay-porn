const { subtasks } = require('../../services/subtask-services.js');
const { NotFoundError } = require('../../errors/not_found-error.js');

const findSubtask = async (req, res, next) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;

  try {
    const subtask = await subtasks.get(taskId, subtaskId);

    if (!subtask) {
      throw new NotFoundError();
    }

    const task = subtasks.getParent(subtask);
    res.locals.allowedId = task.user.id;
    
    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { findSubtask };