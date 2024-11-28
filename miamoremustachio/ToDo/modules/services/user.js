const { User } = require('../models/user.js');

const users = {
  model: User,
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
};

module.exports = { users };