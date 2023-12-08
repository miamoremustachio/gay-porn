const { subtasks } = require('../services/subtask-services.js');

const findSubtask = async (req, res, next) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;

  try {
    const subtask = await subtasks.get(taskId, subtaskId);

    if (!subtask) {
      res.sendStatus(404);
      return;
    }

    const task = subtasks.getParent(subtask);
    res.locals.allowedId = task.userId.toString();
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }
  
  next();
}

module.exports = { findSubtask };