const {
  FIELDS,
  STATUSES,
  PRIORITIES,
  ERRORS,
} = require('./task.const');

const { TITLE, STATUS, PRIORITY } = FIELDS;
const { INVALID_TITLE, INVALID_STATUS, INVALID_PRIORITY } = ERRORS;

function isTitleValid(title) {
  return (typeof title === 'string');
}

function isStatusValid(status) {
  const validStatusesList = Object.values(STATUSES);
  
  return validStatusesList.includes(status);
}

function isPriorityValid(priority) {
  const validPrioritiesList = Object.values(PRIORITIES);

  return validPrioritiesList.includes(priority);
}

const tasksValidationLayer = {
  [TITLE]: {
    fn: isTitleValid,
    message: INVALID_TITLE,
  },
  [STATUS]: {
    fn: isStatusValid,
    message: INVALID_STATUS,
  },
  [PRIORITY]: {
    fn: isPriorityValid,
    message: INVALID_PRIORITY,
  },
};

module.exports = tasksValidationLayer;
