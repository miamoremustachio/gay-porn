const { Task } = require('../models/task.js');
const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { TASK_NOT_FOUND } = ERROR_MESSAGES;

const checkTaskId = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    }

    res.locals.taskUserId = task.userId;
  } catch(error) {
    return res.status(404).send(error.message);
  }
  
  next();
}

module.exports = { checkTaskId };