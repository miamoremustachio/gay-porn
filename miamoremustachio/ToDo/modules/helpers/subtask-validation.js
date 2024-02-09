const { ValidationError } = require('../errors/validation-error.js');

const {
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const { MIN, MAX } = TITLE_LENGTH;
const { INVALID_TITLE } = ERROR_MESSAGES;

// #ToDo: add checkTask import
const checkSubtask = {
  entity: 'Subtask',
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new ValidationError(INVALID_TITLE, this.entity);
    }
  },
}

module.exports = { checkSubtask };