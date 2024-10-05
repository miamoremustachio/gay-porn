const { ERROR } = require('./helpers');

const requestTask = function(task) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${task}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(ERROR.OOPS);
        }
    
        return response.json();
      })
  
    .catch(err => console.error(err.message));
}

module.exports.requestTaskList = function(taskCount) {
  const promises = [];
  
  for (let i = 1; i <= taskCount; i++) {
    promises.push(requestTask(i));
  }

  return Promise.all(promises);
}
