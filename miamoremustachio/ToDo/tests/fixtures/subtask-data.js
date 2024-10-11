const TASK_ID = '65633d765d1d06dcad8ff7d0';
const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

function ValidSubtask() {
  this.title = 'drink korvalol';
  this.completed = false;
}

function ValidSubtaskFields() {
  this.title = 'drink boyaryshnik';
  this.completed = true;
}

function InvalidSubtask() {
  this.title = 'aa';
}

module.exports = {
  TASK_ID,
  HEADERS,
  ValidSubtask,
  ValidSubtaskFields,
  InvalidSubtask,
};