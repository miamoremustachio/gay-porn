const { tasks } = require('../services/task-services.js');

const findTask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await tasks.get(taskId);

    if (!task) {
      res.sendStatus(404);
      return;
    }

    res.locals.allowedId = task.userId.toString();
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }
  
  next();
}

module.exports = { findTask };