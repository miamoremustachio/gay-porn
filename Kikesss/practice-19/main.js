const list = {
  "create a new practice task": "In Progress",
  "make a bed": "Done", 
  "write a post": "To Do",
}

function addTask(newTask, newProgress) {
  list[newTask] = newProgress;
}

function removeTask(removeTask) {
  delete list[removeTask];
}

function replaceProgress(Task, newProgress) {
  list[Task] = newProgress;
}

function showTaskList() {
  console.log(list);
}

showTaskList();
replaceProgress('make a bed', '12321321')
removeTask('write a post')
showTaskList();
addTask('321','12321321321')
showTaskList();
