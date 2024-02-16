const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

function ValidPlan() {
  this.title = 'escape from Strada';
  this.tasks = [
    '655449a15812e4abfc786f29',
    '65544d9f5ae1fc8d350a6693',
    '655451b35ae1fc8d350a6695',
  ];
}

function ValidPlanFields() {
  this.title = 'become a true backender-shmackender';
}

module.exports = {
  USER_ID,
  HEADERS,
  ValidPlan,
  ValidPlanFields,
};