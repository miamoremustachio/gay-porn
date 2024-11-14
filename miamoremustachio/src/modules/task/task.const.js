const FIELDS = {
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
};

const STATUS = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const DEFAULT_STATUS = STATUS.TO_DO;

const PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

const DEFAULT_PRIORITY = PRIORITY.MEDIUM;

const NUMERIC_TO_PROPERTIES = Object.entries(PRIORITY).reduce((acc, entry) => {
  const [key, value] = entry;
  acc[value] = key;
  
  return acc;
}, {});

const ERRORS = {
  INVALID_TITLE: 'Invalid title: it must be a string.',
  INVALID_STATUS: `Invalid status: it must be one of the following: ${Object.values(STATUS).join(', ')}.`,
  INVALID_PRIORITY: `Invalid priority: it must be one of the following: ${Object.values(PRIORITY).join(', ')}.`,
};

module.exports = {
  FIELDS,
  STATUS,
  DEFAULT_STATUS,
  PRIORITY,
  NUMERIC_TO_PROPERTIES,
  DEFAULT_PRIORITY,
  ERRORS,
};
