const { subtasks } = require('../services/subtask-services.js');

const findSubtask = async (req, res, next) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;

  try {
    const subtask = await subtasks.get(taskId, subtaskId);

    if (!subtask) {
      return res.sendStatus(404);
    }

    const task = subtasks.getParent(subtask);
    res.locals.allowedId = task.userId.toString();
  } catch(error) {
    return res.status(500).send(error.message);
  }
  
  next();
}

module.exports = { findSubtask };