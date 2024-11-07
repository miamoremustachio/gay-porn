const { ERRORS } = require('../../config/entities/tasks.config');

const tasksCollection = require('../../db/collections/tasks.collection');
const { NotFoundException } = require('../exceptions');
const { Task } = require('../helpers/tasks.helper');
const { validateAllFields } = require('../validation/entity.validation');
const validationLayer = require('../validation/tasks.validation');

const { TASK_NOT_FOUND } = ERRORS;

const taskService = {
  async add(task) {
    validateAllFields(task, validationLayer);

    await tasksCollection.insertOne(new Task(task));
  },

  delete(taskId) {
    const taskIndex = this.list.findIndex(task => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    // TODO: add database deletion
    this.list.splice(taskIndex, 1);
  },

  change(taskId, newTaskFields) {
    const task = this.list.find(task => task.id === taskId);
  
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    validateAllFields(newTaskFields, validationLayer);

    // TODO: add database changing
    const taskIndex = this.list.indexOf(task);
    const newTask = { id: task.id, ...newTaskFields };

    this.list[taskIndex] = newTask;
  },
};

module.exports = taskService;
