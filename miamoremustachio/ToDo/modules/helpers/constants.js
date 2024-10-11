const STATUSES = {
  TO_DO: "to do",
  IN_PROGRESS: "in progress",
  DONE: "done",
};

const PRIORITIES = {
  LOW: "low",
  HIGH: "high",
};

const TITLE_LENGTH = {
  MIN: 3,
  MAX: 30,
};

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const START_MESSAGE = "ToDo server is running.";

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;
const { MIN: MIN_LENGTH, MAX: MAX_LENGTH } = TITLE_LENGTH;

const ERROR_MESSAGES = {
  MISSING_TITLE: `✗ Request body is missing the "title" property.`,
  INVALID_TITLE: `✗ Invalid title (only strings between ${MIN_LENGTH} and ${MAX_LENGTH} characters are allowed.`,
  INVALID_STATUS: `✗ Invalid status (allowed "status" values: "${TO_DO}", "${IN_PROGRESS}", "${DONE}").`,
  INVALID_PRIORITY: `✗ Invalid priority (allowed "priority" values: "${LOW}", "${HIGH}").`,
  INVALID_DEADLINE: `✗ Invalid deadline (the deadline date can't be earlier than the current date).`,
};


module.exports = {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ROLES,
  START_MESSAGE,
  ERROR_MESSAGES,
};