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

const TEXT_TO_NUMERIC = priority => typeof priority === 'string' ? PRIORITY[priority.toUpperCase()] : priority;

const NUMERIC_TO_TEXT = Object.entries(PRIORITY).reduce((acc, entry) => {
  const [key, value] = entry;
  acc[value] = key[0] + key.slice(1).toLowerCase();
  
  return acc;
}, {});


module.exports = {
  FIELDS,
  STATUS,
  DEFAULT_STATUS,
  PRIORITY,
  TEXT_TO_NUMERIC,
  NUMERIC_TO_TEXT,
  DEFAULT_PRIORITY,
};
