const mongoose = require('mongoose');

const {
  STATUS,
  DEFAULT_STATUS,
  PRIORITY,
  DEFAULT_PRIORITY,
  NUMERIC_TO_PROPERTIES,
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
    get: value => NUMERIC_TO_PROPERTIES[value],
    default: DEFAULT_PRIORITY,
  },
  userId: {
    type: 'ObjectId',
    ref: 'User',
  },
});

const TaskEntity = mongoose.model('Task', taskSchema);

module.exports = TaskEntity;
