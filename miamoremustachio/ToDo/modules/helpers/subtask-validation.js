const {
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const { MIN, MAX } = TITLE_LENGTH;
const { INVALID_TITLE } = ERROR_MESSAGES;

// #ToDo: add checkTask import
const checkSubtask = {
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new Error(INVALID_TITLE);
    }
  },
}

module.exports = { checkSubtask };