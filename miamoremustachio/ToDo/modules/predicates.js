function isTaskExists(id, toDoList) {
  const taskFound = toDoList.find(task => task.id === id);
  return taskFound ? true : false;
}

module.exports = { isTaskExists };