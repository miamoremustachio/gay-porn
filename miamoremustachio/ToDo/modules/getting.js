function getTask(id, toDoList) {
  const task = toDoList.find(task => task.id === id);
  return task;
}

module.exports = { getTask };