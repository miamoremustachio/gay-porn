const { ObjectId } = require('mongodb');

const { ERRORS } = require('../../config/entities/tasks.config');

const tasksCollection = require('../../db/collections/tasks.collection');
const { NotFoundException } = require('../exceptions');
const { getTaskPath, Task } = require('../helpers/tasks.helper');
const { getId } = require('../helpers/entity.helper');
const { validateAllFields } = require('../validation/entity.validation');
const validationLayer = require('../validation/tasks.validation');

const { TASK_NOT_FOUND } = ERRORS;

const taskService = {
  async get(taskId) {
    const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
    
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return task;
  },

  async getAll() {
    const tasksList = await tasksCollection.find().toArray();

    return tasksList;
  },

  async add(task) {
    validateAllFields(task, validationLayer);

    const result = await tasksCollection.insertOne(new Task(task));
    
    const taskId = getId(result);
    const taskPath = getTaskPath(taskId);

    return taskPath;
  },

  async delete(taskId) {
    const task = await tasksCollection.findOneAndDelete({ _id: new ObjectId(taskId) });

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
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
