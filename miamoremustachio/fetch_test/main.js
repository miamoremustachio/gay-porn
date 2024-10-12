const { getTodoList } = require('./modules/helpers');
const { requestTaskList } = require('./modules/requests');

function showTodo(taskCount) {
  requestTaskList(taskCount)
    .then(data => {
      const todoList = getTodoList(data);

      console.log(`Excretus ex fortuna: ${todoList}`);
    });
}

showTodo(42);