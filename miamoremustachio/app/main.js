const {
  TASK_PROPERTIES,
  STATUSES,
  DEFAULT_STATUS,
  PRIORITIES,
  DEFAULT_PRIORITY,
  ERRORS,
} = require('./modules/constants');

const {
  showTasksByStatus,
  idGenerator,
} = require('./modules/helpers');

const { validationLayer } = require('./modules/validation');

const { TITLE, STATUS, PRIORITY } = TASK_PROPERTIES;
const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, MEDIUM, HIGH } = PRIORITIES;
const { TASK_NOT_FOUND, INVALID_TITLE, INVALID_STATUS, INVALID_PRIORITY } = ERRORS;

const { fn: isTitleValid } = validationLayer[TITLE];
const { fn: isStatusValid } = validationLayer[STATUS];
const { fn: isPriorityValid } = validationLayer[PRIORITY];

const getId = () => idGenerator.next().value;

const toDo = {
  list: [
    { id: getId(), title: 'eat', status: TO_DO, priority: LOW },
    { id: getId(), title: 'sleep', status: IN_PROGRESS, priority: MEDIUM },
    { id: getId(), title: 'code', status: DONE, priority: HIGH },
  ],
  add(title, status = DEFAULT_STATUS, priority = DEFAULT_PRIORITY) {
    if (!isTitleValid(title)) {
      throw new Error(INVALID_TITLE);
    }

    if (!isStatusValid(status)) {
      throw new Error(INVALID_STATUS);
    }

    if (!isPriorityValid(priority)) {
      throw new Error(INVALID_PRIORITY);
    }

    const newTask = this.list.push({ id: getId(), title, status, priority });
    return newTask;
  },
  deleteById(taskId) {
    const taskIndex = this.list.findIndex(task => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    };

    const deleted = this.list.splice(taskIndex, 1);
    return deleted;
  },
  deleteByTitle(title) {
    const taskIndex = this.list.findIndex(task => task.title === title);
    const task = this.list[taskIndex] || null;

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    };

    const deleted = this.list.splice(taskIndex, 1);
    return deleted;
  },
  changeTask(taskId, propertyKey, propertyValue) {
    const task = this.list.find(task => task.id === taskId);

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    }

    const { fn: validateProperty, errorMessage } = validationLayer[propertyKey];

    if (!validateProperty(propertyValue)) {
      throw new Error(errorMessage);
    }

    task[propertyKey] = propertyValue;
    return task;
  },
  showTaskList() {
    for (let status in STATUSES) {
      const statusValue = STATUSES[status];

      console.log(`${statusValue}:`);
      showTasksByStatus(statusValue, this.list);
    }
  },
};

module.exports = { toDo };