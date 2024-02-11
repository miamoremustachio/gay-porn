const TASK_ID = '65633d765d1d06dcad8ff7d0';
const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

const VALID_SUBTASK = {
  'title': 'drink korvalol',
  'completed': false,
};

const VALID_FIELDS = {
  'title': 'drink boyaryshnik',
  'completed': true,
};

const INVALID_SUBTASK = {
  'title': 'aa',
};

module.exports = {
  TASK_ID,
  HEADERS,
  VALID_SUBTASK,
  VALID_FIELDS,
  INVALID_SUBTASK,
};