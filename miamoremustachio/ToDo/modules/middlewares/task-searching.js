const { tasks } = require('../services/task-services.js');
const { NotFoundError } = require('../errors/not_found-error.js');

const findTask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await tasks.get(taskId);

    if (!task) {
      throw new NotFoundError();
    }

    res.locals.allowedId = task.user.id;
    
    next();

  } catch(error) {
    next(error);
  }  
}

module.exports = { findTask };