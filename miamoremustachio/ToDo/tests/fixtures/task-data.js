const { getDefaultDeadline } = require('../../modules/helpers/time-helper.js');
const { TASK_STATUSES, TASK_PRIORITIES } = require('../../modules/models/task-model.js');

const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

const VALID_TASK = {
  'title': 'prepare for hard coding',
  'priority': TASK_PRIORITIES.HIGH,
};

const VALID_FIELDS = {
  'title': 'prepare for ass-burning',
  'priority': TASK_PRIORITIES.LOW,
  'status': TASK_STATUSES.DONE,
  'deadline': getDefaultDeadline(),
};

const INVALID_TASK = {
  'title': 'a'.repeat(71),
  'priority': 'foo',
  'status': 'bar',
  'deadline': Date.now(),
};

module.exports = {
  USER_ID,
  HEADERS,
  VALID_TASK,
  VALID_FIELDS,
  INVALID_TASK,
};