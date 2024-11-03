const { TASK_PROPERTIES, DEFAULT_STATUS, DEFAULT_PRIORITY } = require('../../config/app.config');

const { TITLE, STATUS, PRIORITY } = TASK_PROPERTIES;

function* generateIds() {
  let id = 1;

  while (true) {
    yield id++;
  }
}

const idGenerator = generateIds();
const getId = () => idGenerator.next().value;

function Task(title, status, priority) {
  this.id = getId();
  this[TITLE] = title;
  this[STATUS] = status || DEFAULT_STATUS;
  this[PRIORITY] = priority || DEFAULT_PRIORITY;
}

function FilteredTask(body) {
  const taskProperties = Object.values(TASK_PROPERTIES);

  taskProperties.forEach(property => this[property] = body[property]);
}

module.exports = { Task, FilteredTask };
