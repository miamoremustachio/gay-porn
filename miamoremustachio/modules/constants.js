const STATUS = {
    TODO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

const PRIORITY = {
    LOW: 'low',
    HIGH: 'high'
};

const TASK_LENGTH = {
    MIN: 3,
    MAX: 30
};

const ERROR = {
    INVALID_TASK: `Invalid task format: only strings between ${TASK_LENGTH.MIN} and ${TASK_LENGTH.MAX} characters are allowed.`,
    INVALID_STATUS: `Incorrect status: you can use only '${STATUS.TODO}', '${STATUS.IN_PROGRESS}' and '${STATUS.DONE}'.`,
    INVALID_PRIORITY: `Incorrect priority: you can use only '${PRIORITY.LOW}' or '${PRIORITY.HIGH}'.`,
    TASK_EXIST: "Task you want to add is already in list.",
    TASK_NOT_FOUND: "Task wasn't found in list.",
};

module.exports = {
    STATUS,
    PRIORITY,
    TASK_LENGTH,
    ERROR
};