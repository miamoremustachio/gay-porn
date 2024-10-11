const { BaseServices } = require('./base-services.js');
const { User } = require('../models/user-model.js');

class Services extends BaseServices {
  constructor(model) {
    super(model);
  }
}

const users = new Services(User);

module.exports = { users };