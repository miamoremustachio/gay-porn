const {
  TASK_PROPERTIES,
  MAX_TITLE_LENGTH,
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
      console.error(INVALID_TITLE);
      return;
    }

    if (!isStatusValid(status)) {
      console.error(INVALID_STATUS);
      return;
    }

    if (!isPriorityValid(priority)) {
      console.error(INVALID_PRIORITY);
      return;
    }

    const newTask = this.list.push({ id: getId(), title, status, priority });
    return newTask;
  },
  deleteById(taskId) {
    const taskIndex = this.list.findIndex(task => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    };
    const deleted = this.list.splice(taskIndex, 1);
    return deleted;
  },
  deleteByTitle(title) {
    const taskIndex = this.list.findIndex(task => task.title === title);
    const task = this.list[taskIndex] || null;

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    };

    this.list.splice(taskIndex, 1);
  },
  changeTask(taskId, propertyKey, propertyValue) {
    const task = this.list.find(task => task.id === taskId);

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    }

    const { fn: validateProperty, errorMessage } = validationLayer[propertyKey];

    if (!validateProperty(propertyValue)) {
      console.error(errorMessage);
      return;
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