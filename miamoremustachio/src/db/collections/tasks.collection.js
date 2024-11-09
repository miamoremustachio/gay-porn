const { COLLECTIONS } = require('../../config/db.config');
const todo = require('../databases/todo.db');

const tasksCollection = todo.collection(COLLECTIONS.TASKS);

module.exports = tasksCollection;
