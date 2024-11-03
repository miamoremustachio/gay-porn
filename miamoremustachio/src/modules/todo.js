const {
  TASK_PROPERTIES,
  STATUSES,
  PRIORITIES,
  ERRORS,
} = require('../config/app.config');

const { BadRequestException, NotFoundException } = require('./exceptions');
const { Task } = require('./helpers/tasks.helper');
const validationLayer = require('./helpers/validation');

const { TITLE, STATUS, PRIORITY } = TASK_PROPERTIES;
const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, MEDIUM, HIGH } = PRIORITIES;
const { TASK_NOT_FOUND, INVALID_TITLE, INVALID_STATUS, INVALID_PRIORITY } = ERRORS;

const { fn: isTitleValid } = validationLayer[TITLE];
const { fn: isStatusValid } = validationLayer[STATUS];
const { fn: isPriorityValid } = validationLayer[PRIORITY];

const toDo = {
  list: [
    new Task('eat', TO_DO, LOW),
    new Task('sleep', IN_PROGRESS, MEDIUM),
    new Task('code', DONE, HIGH),
  ],
  add({ title, status, priority }) {
    if (!isTitleValid(title)) {
      throw new BadRequestException(INVALID_TITLE);
    }

    if (status && !isStatusValid(status)) {
      throw new BadRequestException(INVALID_STATUS);
    }

    if (priority && !isPriorityValid(priority)) {
      throw new BadRequestException(INVALID_PRIORITY);
    }

    const newTask = this.list.push(new Task(title, status, priority));
    return newTask;
  },
  delete(taskId) {
    const taskIndex = this.list.findIndex(task => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    this.list.splice(taskIndex, 1);
  },
  modify(taskId, propertyKey, propertyValue) {
    const task = this.list.find(task => task.id === taskId);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    const { fn: validateProperty, errorMessage } = validationLayer[propertyKey];

    if (!validateProperty(propertyValue)) {
      throw new BadRequestException(errorMessage);
    }

    task[propertyKey] = propertyValue;
    return task;
  },
};

module.exports = toDo;
