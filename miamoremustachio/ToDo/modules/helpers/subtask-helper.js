const {
  checkTitle,
  checkStatus,
} = require('./task-helper.js');

function checkSubtaskProperties({ title, status }) {
  if (title) {
    checkTitle(title);
  }

  if (status) {
    checkStatus(status);
  }
}

module.exports = { checkSubtaskProperties };