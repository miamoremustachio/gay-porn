const mongoose = require('mongoose');

const { getDefaultDeadline } = require('../helpers/time-helper.js');

const TASK_STATUSES = {
  TO_DO: 'to do',
  IN_PROGRESS: 'in progress',
  DONE: 'done',
};

const TASK_PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
};

const TASK_TITLE_LENGTH = {
  MIN: 3,
  MAX: 70,
};

const { TO_DO } = TASK_STATUSES;
const { LOW } = TASK_PRIORITIES;

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// #ToDo: add mongoose built-in validation
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: TO_DO },
  priority: { type: String, default: LOW },
  deadline: { type: Date, default: getDefaultDeadline },
  subtasks: [subtaskSchema],
  user: { type: 'ObjectId', ref: 'User', immutable: true },
},
{
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_TITLE_LENGTH,
  Task,
};