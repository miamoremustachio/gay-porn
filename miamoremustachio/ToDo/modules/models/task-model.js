const mongoose = require('mongoose');

const { STATUSES, PRIORITIES } = require('../helpers/constants.js');
const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;
const { getDefaultDeadline } = require('../helpers/time-helper.js');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

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

module.exports = { Task };