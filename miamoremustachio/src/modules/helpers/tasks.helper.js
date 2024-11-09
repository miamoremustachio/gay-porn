const {
  RESOURCE_PATH,
  FIELDS,
  DEFAULT_STATUS,
  DEFAULT_PRIORITY,
} = require('../../config/entities/tasks.config');

const { TITLE, STATUS, PRIORITY } = FIELDS;

const getTaskPath = taskId => `${RESOURCE_PATH}/${taskId}`; 

function Task({ title, status, priority }) {
  this[TITLE] = title;
  this[STATUS] = status || DEFAULT_STATUS;
  this[PRIORITY] = priority || DEFAULT_PRIORITY;
}

function FilteredTask(body) {
  const taskProperties = Object.values(FIELDS);

  taskProperties.forEach(property => this[property] = body[property]);
}

module.exports = {
  getTaskPath,
  Task,
  FilteredTask,
};
