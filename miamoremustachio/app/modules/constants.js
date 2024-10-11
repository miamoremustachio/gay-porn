const TASK_PROPERTIES = {
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
};

const MAX_TITLE_LENGTH = 70;

const STATUSES = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const DEFAULT_STATUS = STATUSES.TO_DO;

const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

const DEFAULT_PRIORITY = PRIORITIES.MEDIUM;

const ERRORS = {
  TASK_NOT_FOUND: 'Error: Task not found.',
  INVALID_TITLE: `Error: Invalid title: it must be a string less than ${MAX_TITLE_LENGTH} characters long.`,
  INVALID_STATUS: `Error: Invalid status: it must be either "${Object.values(STATUSES).join(', ')}.`,
  INVALID_PRIORITY: `Error: Invalid priority: it must be either ${Object.values(PRIORITIES).join(', ')}.`,
};

module.exports = {
  TASK_PROPERTIES,
  MAX_TITLE_LENGTH,
  STATUSES,
  DEFAULT_STATUS,
  PRIORITIES,
  DEFAULT_PRIORITY,
  ERRORS,
};