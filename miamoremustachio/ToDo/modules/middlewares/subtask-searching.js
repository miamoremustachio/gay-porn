const { tasks } = require('../services/task-services.js');

const findSubtask = async (req, res, next) => {
  const taskId = req.params.id;
  const subtaskId = req.params.subtaskId;

  try {
    const task = await tasks.get(taskId);
    const subtask = task.subtasks.id(subtaskId);

    if (!subtask) {
      return res.sendStatus(404);
    }

    res.locals.allowedId = task.userId.toString();
  } catch(error) {
    return res.status(500).send(error.message);
  }
  
  next();
}

module.exports = { findSubtask };