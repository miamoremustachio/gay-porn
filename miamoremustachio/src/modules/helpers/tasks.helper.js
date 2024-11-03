const { DEFAULT_STATUS, DEFAULT_PRIORITY } = require('../../config/app.config');

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
  this.title = title;
  this.status = status || DEFAULT_STATUS;
  this.priority = priority || DEFAULT_PRIORITY;
}

module.exports = { Task };
