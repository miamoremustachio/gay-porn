function isTaskExists(title, toDoList) {
  const taskFound = toDoList.find(task => task.title === title);
  return taskFound ? true : false;
}

module.exports = {
  isTaskExists,
};