const PORT = process.env.PORT || 3000;

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

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;
const { MIN: MIN_LENGTH, MAX: MAX_LENGTH } = TITLE_LENGTH;

const START_MESSAGE = "ToDo server is running.";

const ERROR_MESSAGES = {
  MISSING_TITLE: `✗ Request body is missing the "title" property.`,
  INVALID_TITLE: `✗ Invalid title (only strings between ${MIN_LENGTH} and ${MAX_LENGTH} characters are allowed.`,
  INVALID_STATUS: `✗ Invalid status (allowed "status" values: "${TO_DO}", "${IN_PROGRESS}", "${DONE}").`,
  INVALID_PRIORITY: `✗ Invalid priority (allowed "priority" values: "${LOW}", "${HIGH}")`,
  TASK_NOT_FOUND: "✗ Task wasn't found in list.",
  ACCESS_FORBIDDEN: "✗ Access to the requested task is denied.",
};


module.exports = {
  PORT,
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  START_MESSAGE,
  ERROR_MESSAGES,
};