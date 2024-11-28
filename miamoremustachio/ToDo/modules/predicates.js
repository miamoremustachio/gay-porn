function isTaskExists(title, toDoList) {
  const taskFound = toDoList.find(task => task.title === title);
  return taskFound ? true : false;
}

function isDefined(value) {
  return (typeof value !== 'undefined') ? true : false;
}

module.exports = {
  isTaskExists,
  isDefined,
};