const { tasks } = require('../services/task-services.js');

const findTask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await tasks.get(taskId);

    if (!task) {
      return res.sendStatus(404);
    }

    res.locals.allowedId = task.userId.toString();
  } catch(error) {
    return res.status(500).send(error.message);
  }
  
  next();
}

module.exports = { findTask };