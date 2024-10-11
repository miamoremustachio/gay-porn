const { SubtaskValidator } = require('../../validators/subtask-validator.js');

const check = new SubtaskValidator();

const validateSubtask = (req, res, next) => {
  const { title } = req.body;

  if (title) {
    try {
      check.title(title);
    } catch(error) {
      next(error);
      return;
    }
  }

  next();
}

module.exports = { validateSubtask };