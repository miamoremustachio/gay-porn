const { DEFAULT_STATUS, DEFAULT_PRIORITY } = require('./constants');

function showTasksByStatus(status, list) {
  let hasTasksWithThisStatus;

  const filteredList = list.filter((task) => task.status === status);

  filteredList.forEach(task => {
    console.log(`\t ${task.id}. "${task.title}"`);
    hasTasksWithThisStatus = true;
  })

  if (!hasTasksWithThisStatus) console.log('\t -');
}

function* generateIds() {
  let id = 1;

  while(true) {
    yield id++;
  }
}

const idGenerator = generateIds();
const getId = () => idGenerator.next().value;

function Task(title, status, priority) {
  this.id = getId();
  this.title = title;
  this.status = status || DEFAULT_STATUS;
  this.priority = priority || DEFAULT_PRIORITY;
}

module.exports = {
  showTasksByStatus,
  Task,
};