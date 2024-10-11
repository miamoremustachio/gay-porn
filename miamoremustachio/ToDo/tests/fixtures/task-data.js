const { Task } = require('../../modules/models/task-model.js');

const validStatuses = Task.schema.path('status').enumValues;
const validPriorities = Task.schema.path('priority').enumValues;

const defaultDeadline = Task.schema.path('deadline').defaultValue();

const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

function ValidTask() {
  this.title = 'prepare for hard coding';
  this.priority = validPriorities[0];
}

function ValidTaskFields() {
  this.title = 'prepare for ass-burning';
  this.priority = validPriorities[1];
  this.status = validStatuses[1];
  this.deadline = defaultDeadline;
}

function InvalidTask() {
  this.title = 'a'.repeat(71);
  this.priority = 'foo';
  this.status = 'bar';
  this.deadline = Date.now();
}

module.exports = {
  USER_ID,
  HEADERS,
  ValidTask,
  ValidTaskFields,
  InvalidTask,
};