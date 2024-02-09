const { ValidationError } = require('../errors/validation-error.js');

const {
  STATUSES,
  PRIORITIES,
  TITLE_LENGTH,
} = require('../helpers/constants.js');

const { MIN, MAX } = TITLE_LENGTH;

const {
  TO_DO,
  IN_PROGRESS,
  DONE,
} = STATUSES;

const {
  LOW,
  HIGH,
} = PRIORITIES;

// #ToDo: add base-validation clASS
const checkTask = {
  entity: 'Task',
  messages: {
    title: `Invalid title (only strings between ${MIN} and ${MAX} characters are allowed).`,
    status: `Invalid status (allowed status values: "${TO_DO}", "${IN_PROGRESS}", "${DONE}").`,
    priority: `Invalid priority (allowed priority values: "${LOW}", "${HIGH}").`,
    deadline: `Invalid deadline (the deadline date can't be earlier than the current date).`,
  },
  title(title) {
    if (title.length < MIN || title.length > MAX) {
      throw new ValidationError(this.messages.title, this.entity);
    }
  },
  status(status) {
    const statuses = Object.values(STATUSES);
    
    if (!statuses.includes(status)) {
      throw new ValidationError(this.messages.status, this.entity);
    }
  },
  priority(priority) {
    const priorities = Object.values(PRIORITIES);
      
    if (!priorities.includes(priority)) {
      throw new ValidationError(this.messages.priority, this.entity);
    }
  },
  deadline(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    
    if (deadlineDate < currentDate) {
      throw new ValidationError(this.messages.deadline, this.entity);
    }
  },
  all(fields) {
    for (const field in fields) {
      if (this[field]) {
        this[field](fields[field]);
      }
    }
  },
};

const checkTaskFields = (req, res, next) => {
  const fields = req.body;
    
    try {
      checkTask.all(fields);
    } catch(error) {
      next(error);
      return;
    }

    next();
}

module.exports = { checkTaskFields };