const mongoose = require('mongoose');

const { getDefaultDeadline } = require('../helpers/time-helper.js');

const STATUSES = {
  TO_DO: 'to do',
  IN_PROGRESS: 'in progress',
  DONE: 'done',
};

const PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
};

const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: TO_DO, enum: Object.values(STATUSES) },
  priority: { type: String, default: LOW, enum: Object.values(PRIORITIES) },
  deadline: { type: Date, default: getDefaultDeadline },
  subtasks: [subtaskSchema],
  user: { type: 'ObjectId', ref: 'User', immutable: true },
},
{
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };