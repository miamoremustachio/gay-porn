const { tasks } = require('../services/task.js');
const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { TASK_NOT_FOUND } = ERROR_MESSAGES;

const findTask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await tasks.get(taskId);

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    }

    res.locals.allowedId = task.userId;
  } catch(error) {
    return res.status(404).send(error.message);
  }
  
  next();
}

module.exports = { findTask };