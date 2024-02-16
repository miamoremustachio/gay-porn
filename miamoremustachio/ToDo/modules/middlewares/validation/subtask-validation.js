const { SubtaskValidator } = require('../../validators/subtask-validator.js');

const check = new SubtaskValidator();

const validateSubtask = (req, res, next) => {
  const fields = req.body;

  try {
    check.all(fields);
  } catch(error) {
    next(error);
    return;
  }

  next();
}

module.exports = { validateSubtask };