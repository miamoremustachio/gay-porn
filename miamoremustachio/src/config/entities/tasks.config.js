const { HOST } = require('../server.config');
const { SearchByIdFilter, ReturnDocumentOption } = require('../../modules/helpers/entity.helper');

const RESOURCE_PATH = `${HOST}/tasks`;

const FIELDS = {
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
};

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 30;

const STATUSES = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const DEFAULT_STATUS = STATUSES.TO_DO;

const PRIORITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

const DEFAULT_PRIORITY = PRIORITIES.MEDIUM;

const FILTERS = {
  DELETION_FILTER: id => new SearchByIdFilter(id),
  CHANGING_FILTER: id => new SearchByIdFilter(id),
};

const DEFAULT_RETURN_DOCUMENT_VALUE = 'after';

const OPTIONS = {
  RETURN_DOCUMENT_OPTION: (value = DEFAULT_RETURN_DOCUMENT_VALUE) => new ReturnDocumentOption(value),
};

const ERRORS = {
  TASK_NOT_FOUND: 'Task not found.',
  INVALID_TITLE: `Invalid title: it must be a string more than ${MIN_TITLE_LENGTH} and less than ${MAX_TITLE_LENGTH} characters long.`,
  INVALID_STATUS: `Invalid status: it must be one of the following: ${Object.values(STATUSES).join(', ')}.`,
  INVALID_PRIORITY: `Invalid priority: it must be one of the following: ${Object.values(PRIORITIES).join(', ')}.`,
};

module.exports = {
  RESOURCE_PATH,
  FIELDS,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  STATUSES,
  DEFAULT_STATUS,
  PRIORITIES,
  DEFAULT_PRIORITY,
  FILTERS,
  OPTIONS,
  ERRORS,
};
