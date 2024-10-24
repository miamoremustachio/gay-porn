const { API_ENDPOINT } = require('./config');
const { getResponseErrorMessage } = require('./helpers');

const requestTask = function (taskNum) {
  const url = new URL(taskNum, API_ENDPOINT);

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(response));
      }
  
      return response.json();
    });  
}

module.exports.requestTodo = function (taskCount) {
  const promises = [];
  
  for (let i = 1; i <= taskCount; i++) {
    promises.push(requestTask(i));
  }

  return Promise.all(promises);
}
