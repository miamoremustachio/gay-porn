const { Plan } = require('../models/plan-model.js');

const plans = {
  model: Plan,
  taskProjection: [ '-user' ],
  userProjection: [ 'username', 'email' ],
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id)
    .populate('tasks', this.taskProjection)
    .populate('user', this.userProjection);
  },
  getAll(query) {
    return this.model.find(query)
    .populate('tasks', this.taskProjection)
    .populate('user', this.userProjection);
  },
  update(id, query, options) {
    return this.model.findByIdAndUpdate(id, query, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

module.exports = { plans };