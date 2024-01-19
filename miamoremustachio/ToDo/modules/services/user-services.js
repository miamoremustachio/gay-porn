const { BaseServices } = require('./base-services.js');
const { User } = require('../models/user-model.js');

class Services extends BaseServices {
  constructor(model) {
    super(model);
  }

  get(id) {
    return this.model.findById(id);
  }

  getAll(filter) {
    return this.model.find(filter);
  }
}

const users = new Services(User);

module.exports = { users };