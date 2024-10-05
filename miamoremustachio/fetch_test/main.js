const ERROR = {
  OOPS: 'Oops! Some shit happened!',
};

function requestTask(task) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${task}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(ERROR.OOPS);
        }
    
        return response.json();
      })
  
    .catch(err => console.error(err.message));
}

function requestTaskList(taskCount) {
  const promises = [];
  
  for (let i = 1; i <= taskCount; i++) {
    promises.push(requestTask(i));
  }

  return Promise.all(promises);
}

function getTodoList(tasksArray) {
  return tasksArray.map(task => {
      const checkMark = task.completed ? '☑' : '☐';

      return `\n\t ${checkMark} ${task.title}`;
    });
}

function showTodo(taskCount) {
  requestTaskList(taskCount)
    .then(data => {
      const todoList = getTodoList(data);

      console.log(`Excretus ex fortuna: ${todoList}`);
    });
}

showTodo(10);