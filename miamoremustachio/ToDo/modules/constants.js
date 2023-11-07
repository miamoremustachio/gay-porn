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

const ERROR_MESSAGES = {
  INVALID_TITLE: "Invalid task (only string titles are allowed).",
  INVALID_STATUS: `Invalid status (use "${TO_DO}", "${IN_PROGRESS}" or "${DONE}").`,
  INVALID_PRIORITY: `Invalid priority (use "${LOW}" or "${HIGH}")`,
  INVALID_NUMBER: "Invalid task number (only finite numbers are allowed)",
  INCORRECT_TITLE_LENGTH: `Incorrect task's length (only titles between ${MIN_LENGTH} and ${MAX_LENGTH} characters are allowed).`,
  MISSING_ARGUMENTS: "Function arguments is missing.",
  TASK_EXISTS: "Task you want to add is already in list.",
  TASK_NOT_FOUND: "Task wasn't found in list.",
};

const INFO_MESSAGES = {
  SUCCESSFULLY_ADDED: "Task has successfully added:",
  SUCCESSFULLY_CHANGED_STATUS: "Task status has successfully changed:",
  SUCCESSFULLY_CHANGED_PRIORITY: "Task priority has successfully changed:",
  SUCCESSFULLY_DELETED: "Task has successfully deleted.",
};

module.exports = {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ERROR_MESSAGES,
  INFO_MESSAGES,
};