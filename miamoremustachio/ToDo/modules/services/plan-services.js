const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Plan } = require('../models/plan-model.js');

const plans = {
  model: Plan,
  projections: {
    plan: '-user -tasks.user',
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

    return this.model.aggregate()
      .match({ user: userId })
      .lookup({
        from: 'tasks',
        localField: 'tasks',
        foreignField: '_id',
        as: 'tasks',
      })
      .addFields({ tasksAmount: { $size: '$tasks' } })
      .project(this.projections.plan);
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

module.exports = { plans };