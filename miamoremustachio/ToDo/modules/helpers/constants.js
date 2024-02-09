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

module.exports = {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ROLES,
  DEFAULT_SORT_ORDER,
  START_MESSAGE,
};