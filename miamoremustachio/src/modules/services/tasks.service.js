const { ERRORS } = require('../../config/entities/tasks.config');

const { NotFoundException } = require('../exceptions');
const { Task } = require('../helpers/tasks.helper');
const { validateAllFields } = require('../validation/entity.validation');
const validationLayer = require('../validation/tasks.validation');

const { TASK_NOT_FOUND } = ERRORS;

const taskService = {
  add(task) {
    validateAllFields(task, validationLayer);

    this.list.push(new Task(task));
  },
  delete(taskId) {
    const taskIndex = this.list.findIndex(task => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    this.list.splice(taskIndex, 1);
  },
  change(taskId, newTaskFields) {
    const task = this.list.find(task => task.id === taskId);
  
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    validateAllFields(newTaskFields, validationLayer);

    const taskIndex = this.list.indexOf(task);
    const newTask = { id: task.id, ...newTaskFields };

    this.list[taskIndex] = newTask;
  },
};

module.exports = taskService;
