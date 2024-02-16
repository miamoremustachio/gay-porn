const { getDefaultDeadline } = require('../../modules/helpers/time-helper.js');
const { Task } = require('../../modules/models/task-model.js');

const validStatus = Task.schema.path('status').enumValues[0];
const validPriority = Task.schema.path('priority').enumValues[0];

const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

function ValidTask() {
  this.title = 'prepare for hard coding';
  this.priority = validPriority;
};

function ValidTaskFields() {
  this.title = 'prepare for ass-burning';
  this.priority = validPriority;
  this.status = validStatus;
  this.deadline = getDefaultDeadline();
};

function InvalidTask() {
  this.title = 'a'.repeat(71);
  this.priority = 'foo';
  this.status = 'bar';
  this.deadline = Date.now();
};

module.exports = {
  USER_ID,
  HEADERS,
  ValidTask,
  ValidTaskFields,
  InvalidTask,
};