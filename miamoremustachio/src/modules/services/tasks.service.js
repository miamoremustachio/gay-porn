const { ObjectId } = require('mongodb');

const { FILTERS, OPTIONS, ERRORS } = require('../../config/entities/tasks.config');

const tasksCollection = require('../../db/collections/tasks.collection');
const { NotFoundException } = require('../exceptions');
const { getTaskPath, Task } = require('../helpers/tasks.helper');
const { getId } = require('../helpers/entity.helper');
const { validateAllFields } = require('../validation/entity.validation');
const validationLayer = require('../validation/tasks.validation');

const { DELETION_FILTER, CHANGING_FILTER } = FILTERS;
const { RETURN_DOCUMENT_OPTION } = OPTIONS;
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
    const filter = DELETION_FILTER(taskId);
    const task = await tasksCollection.findOneAndDelete(filter);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
  },

  async change(taskId, newTaskFields) {
    const filter = CHANGING_FILTER(taskId);
    const options = RETURN_DOCUMENT_OPTION();
    const task = await tasksCollection.findOneAndReplace(filter, newTaskFields, options);
    
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    validateAllFields(newTaskFields, validationLayer);

    return task;
  },
};

module.exports = taskService;
