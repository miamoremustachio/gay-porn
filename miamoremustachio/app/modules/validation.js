const { 
  TASK_PROPERTIES,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  STATUSES,
  PRIORITIES,
  ERRORS,
} = require('./constants');

const { TITLE, STATUS, PRIORITY } = TASK_PROPERTIES;
const { INVALID_TITLE, INVALID_STATUS, INVALID_PRIORITY } = ERRORS;

function isTitleValid(title) {
  return (typeof title === 'string' && title.length > MIN_TITLE_LENGTH && title.length < MAX_TITLE_LENGTH);
}

function isStatusValid(status) {
  const validStatusesList = Object.values(STATUSES);
  
  return validStatusesList.includes(status);
}

function isPriorityValid(priority) {
  const validPrioritiesList = Object.values(PRIORITIES);

  return validPrioritiesList.includes(priority);
}

const validationLayer = {
  [TITLE]: {
    fn: isTitleValid,
    errorMessage: INVALID_TITLE, 
  },
  [STATUS]: {
    fn: isStatusValid,
    errorMessage: INVALID_STATUS,
  },
  [PRIORITY]: {
    fn: isPriorityValid,
    errorMessage: INVALID_PRIORITY, 
  },
};

module.exports = { validationLayer };