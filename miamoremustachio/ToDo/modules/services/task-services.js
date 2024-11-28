const { Task } = require('../models/task-model.js');

const tasks = {
  model: Task,
  userProjection: [ 'username', 'email' ],
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id).populate('user', this.userProjection);
  },
  getAll(query) {
    return this.model.find(query).populate('user', this.userProjection);
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
};

module.exports = { tasks };