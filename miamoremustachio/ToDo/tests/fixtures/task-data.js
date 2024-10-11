const { getDefaultDeadline } = require('../../modules/helpers/time-helper.js');
const { TASK_STATUSES, TASK_PRIORITIES } = require('../../modules/models/task-model.js');

const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

function ValidTask() {
  this.title = 'prepare for hard coding';
  this.priority = TASK_PRIORITIES.HIGH;
};

function ValidTaskFields() {
  this.title = 'prepare for ass-burning';
  this.priority = TASK_PRIORITIES.LOW;
  this.status = TASK_STATUSES.DONE;
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