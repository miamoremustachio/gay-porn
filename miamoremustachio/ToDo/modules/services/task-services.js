const { Task } = require('../models/task-model.js');

const tasks = {
  model: Task,
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id);
  },
  getAll(query) {
    return this.model.find(query);
  },
  update(id, query, options) {
    return this.model.findByIdAndUpdate(id, query, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

module.exports = { tasks };