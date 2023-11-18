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

const ERROR_MESSAGES = {
  INVALID_TITLE: "✗ Invalid title (only strings are allowed).",
  INVALID_STATUS: `✗ Invalid status (use "${TO_DO}", "${IN_PROGRESS}" or "${DONE}").`,
  INVALID_PRIORITY: `✗ Invalid priority (use "${LOW}" or "${HIGH}")`,
  INCORRECT_TITLE_LENGTH: `✗ Incorrect task's length (only titles between ${MIN_LENGTH} and ${MAX_LENGTH} characters are allowed).`,
  TASK_NOT_FOUND: "✗ Task wasn't found in list.",
};

const START_MESSAGE = "ToDo server is running.";

module.exports = {
  PORT,
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
  ERROR_MESSAGES,
  START_MESSAGE,
};