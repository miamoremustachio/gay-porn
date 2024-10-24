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

module.exports.requestTodo = (taskCount, promises = []) => {
  const taskNum = promises.length + 1;

  promises.push(requestTask(taskNum));

  if (taskNum === taskCount) {
    return Promise.all(promises);
  }
  
  return this.requestTodo(taskCount, promises);
}
