const { ValidationError } = require('../errors/validation-error.js');

const {
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('../helpers/constants.js');

const { MIN, MAX } = TITLE_LENGTH;
const { INVALID_TITLE } = ERROR_MESSAGES;

const checkSubtask = {
  entity: 'Subtask',
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new ValidationError(INVALID_TITLE, this.entity);
    }
  },
};

const checkSubtaskFields = (req, res, next) => {
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

module.exports = { checkSubtaskFields };