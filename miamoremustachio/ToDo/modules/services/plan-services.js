const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Plan } = require('../models/plan-model.js');

const plans = {
  model: Plan,
  projections: {
    plan: '-user',
    task: [ '-user' ],
    user: [ 'username', 'email' ],
  },
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id)
      .populate('tasks', this.projections.task)
      .populate('user', this.projections.user);
  },
  getAll(query) {
    const userId = new ObjectId(query.userId);

    // #ToDo: add tasks $lookup
    return this.model.aggregate()
      .match({ user: userId })
      .addFields({ tasksAmount: { $size: '$tasks' } })
      .project(this.projections.plan);
  },
  update(id, query, options) {
    return this.model.findByIdAndUpdate(id, query, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

module.exports = { plans };