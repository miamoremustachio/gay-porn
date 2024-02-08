const STATUSES = {
  TO_DO: 'to do',
  IN_PROGRESS: 'in progress',
  DONE: 'done',
};

const PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
};

const TITLE_LENGTH = {
  MIN: 3,
  MAX: 70,
};

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const DEFAULT_SORT_ORDER = 'ascending';
const START_MESSAGE = 'ToDo server is running.';

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;
const { MIN, MAX } = TITLE_LENGTH;

const ERROR_MESSAGES = {
  INVALID_TITLE: `✗ Invalid title (only strings between ${MIN} and ${MAX} characters are allowed.`,
  INVALID_STATUS: `✗ Invalid status (allowed "status" values: "${TO_DO}", "${IN_PROGRESS}", "${DONE}").`,
  INVALID_PRIORITY: `✗ Invalid priority (allowed "priority" values: "${LOW}", "${HIGH}").`,
  INVALID_DEADLINE: `✗ Invalid deadline (the deadline date can't be earlier than the current date).`,
};

module.exports = {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ROLES,
  DEFAULT_SORT_ORDER,
  START_MESSAGE,
  ERROR_MESSAGES,
};