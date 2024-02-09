const { ValidationError } = require('../../errors/validation-error.js');
const { TITLE_LENGTH } = require('../../helpers/constants.js');

const { MIN, MAX } = TITLE_LENGTH;

const checkSubtask = {
  entity: 'Subtask',
  messages: {
    title: `Invalid title (only strings between ${MIN} and ${MAX} characters are allowed).`,
  },
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new ValidationError(this.messages.title, this.entity);
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