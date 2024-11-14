const mongoose = require('mongoose');

const { STATUS, DEFAULT_STATUS } = require('./subtask.const');

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: DEFAULT_STATUS,
  },
});

const SubtaskEntity = mongoose.model('Subtask', subtaskSchema);

module.exports = SubtaskEntity;
