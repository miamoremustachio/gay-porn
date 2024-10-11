const { NotFoundError } = require('../../errors/not_found-error.js');

const findTaskRef = (req, res, next) => {
  const taskId = req.params.taskId;
  const taskRefs = res.locals.taskRefs;

  try {
    const taskRef = taskRefs.find(taskRef => taskId === taskRef.toString());

    if (!taskRef) {
      throw new NotFoundError();
    }

    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { findTaskRef };