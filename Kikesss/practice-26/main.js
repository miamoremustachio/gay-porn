const STATUS = {
  IN_PROGRESS: 'In progress',
  TODO: 'ToDo',
  DONE: 'Done'
}

const PRIORITY = {
  LOW: 'Low',
  HIGH: 'High'
}

let taskList = [
  {taskName: 'Купить масло', status: STATUS.DONE, priority: PRIORITY.LOW},
  {taskName: 'Изучить js', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH}
];

const findIndexTask = (ourTask) =>{
  let indexTask = taskList.findIndex(task => task.taskName === ourTask)
  return indexTask;
}

const addNewTask = (newTask, priority) => {
  const newObj = { 
    taskName: newTask,
    status: STATUS.IN_PROGRESS,
    priority: priority
  }
  taskList.push(newObj);
}

const replaceFullTask = (ourTask, newTask, newStatus, newPriority) =>{
  const indexTask = findIndexTask(ourTask);
  if (indexTask === -1) return null;
  taskList[indexTask].taskName = newTask;
  taskList[indexTask].status = newStatus;
  taskList[indexTask].priority = newPriority;
} 

const replaceStatusTask = (ourTask, newStatus) =>{
  const indexTask = findIndexTask(ourTask);
  if (indexTask === -1) return null;
  taskList[indexTask].status = newStatus;
}

const replacePriorityTask = (ourTask, newPriority) =>{
  const indexTask = findIndexTask(ourTask);
  if (indexTask === -1) return null;
  taskList[indexTask].priority = newPriority;
}

const removeTask = (removeTask) =>{
  taskList = taskList.filter(z => z.taskName!== removeTask);
}

addNewTask('Выучить английский язык', PRIORITY.HIGH);
replaceFullTask('Выучить английский язык','бла-бла-бла', STATUS.DONE, PRIORITY.HIGH);
removeTask('бла-бла-бла');
replaceStatusTask('Купить масло', STATUS.IN_PROGRESS);

console.log(taskList);



