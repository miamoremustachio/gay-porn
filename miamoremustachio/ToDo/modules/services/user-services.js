const { User } = require('../models/user-model.js');

const users = {
  model: User,
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id);
  },
  getAll(filter) {
    return this.model.find(filter);
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
};

module.exports = { users };