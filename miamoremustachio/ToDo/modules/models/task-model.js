const mongoose = require('mongoose');

const { STATUSES, PRIORITIES } = require('../helpers/constants.js');
const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;
const { getDefaultDeadline } = require('../helpers/task-helper.js');

const subtasksSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: TO_DO },
});

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: TO_DO },
  priority: { type: String, default: LOW },
  deadline: { type: Date, default: getDefaultDeadline },
  subtasks: [subtasksSchema],
  user: { type: 'ObjectId', ref: 'User' },
},
{
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };