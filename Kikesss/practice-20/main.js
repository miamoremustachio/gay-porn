const list = {
  "create a new practice task": "In Progress",
  "make a bed": "Done",
  "write a post": "To Do",
}

const addTask = (newTask, newProgress) => {
  list[newTask] = newProgress;
}

const removeTask = (removeTask) =>{
  delete list[removeTask];
}

const replaceProgress = (task, newProgress) =>{
  list[task] = newProgress;
}

const showTaskList = () =>{
  console.log(list);
}


showTaskList();
replaceProgress('make a bed', '12321321')
removeTask('write a post')
showTaskList();
addTask('321', '12321321321')
showTaskList();
