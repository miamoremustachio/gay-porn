const { checkSubtask } = require('../../validators/subtask-validator.js');

const validateSubtask = (req, res, next) => {
  const { title } = req.body;

  if (title) {
    try {
      checkSubtask.title(title);
    } catch(error) {
      next(error);
      return;
    }
  }

  next();
}

module.exports = { validateSubtask };