const mongoose = require('mongoose');

const SubtaskEntity = require('../subtask/subtask.entity');
const subtaskSchema = SubtaskEntity.schema;

const {
  STATUS,
  DEFAULT_STATUS,
  PRIORITY,
  DEFAULT_PRIORITY,
  NUMERIC_TO_TEXT,
} = require('./task.const');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: DEFAULT_STATUS,
  },
  priority: {
    type: Number,
    enum: Object.values(PRIORITY),
    get: value => NUMERIC_TO_TEXT[value],
    default: DEFAULT_PRIORITY,
  },
  deadline: {
    type: Date,
  },
  subtasks: [subtaskSchema],
  planId: {
    type: 'ObjectId',
    ref: 'Plan',
  },
  userId: {
    type: 'ObjectId',
    ref: 'User',
  },
});

const TaskEntity = mongoose.model('Task', taskSchema);

module.exports = TaskEntity;
