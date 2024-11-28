const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const {
  isTaskExists,
} = require('./predicates.js');

const { MIN, MAX } = TITLE_LENGTH;
const {
  INVALID_TITLE,
  INVALID_STATUS,
  INVALID_PRIORITY,
  INVALID_NUMBER,
  INCORRECT_TITLE_LENGTH,
  MISSING_ARGUMENTS,
  TASK_EXISTS,
  TASK_NOT_FOUND,
} = ERROR_MESSAGES;

function checkArguments(arguments) {
  const argumentsObject = arguments[0];
  const argumentsAmount = Object.entries(argumentsObject).length;

  if (!argumentsAmount) {
    throw new Error(MISSING_ARGUMENTS);
  }
}

function checkTitle(title, toDoList) {
  if (typeof title !== 'string') {
    throw new Error(INVALID_TITLE);
  
  } else if (title.length < MIN || title.length > MAX) {
    throw new Error(INCORRECT_TITLE_LENGTH);
  
  } else if (isTaskExists(title, toDoList)) {
    throw new Error(TASK_EXISTS);

  } else return;
}

function checkStatus(status) {
  const statuses = Object.values(STATUSES);

  if (!statuses.includes(status)) {
    throw new Error(INVALID_STATUS);
  }
}

function checkPriority(priority) {
  const priorities = Object.values(PRIORITIES);
    
  if (!priorities.includes(priority)) {
    throw new Error(INVALID_PRIORITY);
  }
}

function checkTaskNumber(number, toDoList) {
  if (!isFinite(number)) {
    throw new Error(INVALID_NUMBER);
  }

  if (number < 1 || number > toDoList.length) {
    throw new Error(TASK_NOT_FOUND);
  }
}

function findTask(title, toDoList) {
  const taskFound = toDoList.find(task => task.title === title);

  if (!taskFound) {
    throw new Error(TASK_NOT_FOUND);
  }

  return taskFound;
}

module.exports = {
  checkArguments,
  checkTitle,
  checkStatus,
  checkPriority,
  checkTaskNumber,
  findTask,
};