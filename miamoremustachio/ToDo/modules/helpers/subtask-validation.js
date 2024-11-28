const {
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const { MIN, MAX } = TITLE_LENGTH;
const {
  MISSING_TITLE,
  INVALID_TITLE,
} = ERROR_MESSAGES;

const checkSubtask = {
  title(title) {
    if (!title) {
      throw new Error(MISSING_TITLE);
    }

    if (title.length < MIN || title.length > MAX) {
      throw new Error(INVALID_TITLE);
    }
  },
}

module.exports = { checkSubtask };