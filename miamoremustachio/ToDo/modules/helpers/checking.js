const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ERROR_MESSAGES,
} = require('./constants.js');

const { isDocumentExists } = require('./predicates.js');

const { MIN, MAX } = TITLE_LENGTH;
const {
  INVALID_TITLE,
  INVALID_STATUS,
  INVALID_PRIORITY,
  INCORRECT_TITLE_LENGTH,
  TASK_NOT_FOUND,
} = ERROR_MESSAGES;

async function checkId(collection, id) {
  const task = await isDocumentExists(collection, id);
  if (!task) {
    throw new Error(TASK_NOT_FOUND);
  }
}

function checkTitle(title) {
  if (typeof title !== 'string') {
    throw new Error(INVALID_TITLE);
  }
  
  if (title.length < MIN || title.length > MAX) {
    throw new Error(INCORRECT_TITLE_LENGTH);
  }
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

function checkProperties({ title, status, priority }) {
  if (title) {
    checkTitle(title);
  }

  if (status) {
    checkStatus(status);
  }

  if (priority) {
    checkPriority(priority);
  }
}

module.exports = {
  checkId,
  checkTitle,
  checkProperties,
};