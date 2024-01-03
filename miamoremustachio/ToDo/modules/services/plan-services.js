const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Plan } = require('../models/plan-model.js');
const { SortField } = require('../helpers/task-helper.js');

const plans = {
  model: Plan,
  projections: {
    plan: '-user -tasks.user',
    tasks: '-user',
    user: 'username email',
  },
  create(doc) {
    return this.model.create(doc);
  },
  get(id, filter) {
    const {
      ['tasks-sort']: tasksSort,
      ['sort-order']: sortOrder,
    } = filter || {};

    const query = this.model.findById(id)
      .populate({
        path: 'tasks',
        select: this.projections.tasks,
        options: {
          sort: tasksSort ? new SortField(tasksSort, sortOrder) : null,
        }
      })
      .populate('user', this.projections.user);
  
      return query;
  },
  getAll(filter) {
    const userId = new ObjectId(filter.userId);
    const { sort, ['sort-order']: sortOrder } = filter;

    const aggregation = this.model.aggregate()
      .match({ user: userId })
      .lookup({
        from: 'tasks',
        localField: 'tasks',
        foreignField: '_id',
        as: 'tasks',
        pipeline: [{
          $sort: { deadline: 1 }
        }],
      })
      .addFields({ tasksAmount: { $size: '$tasks' } })
      .project(this.projections.plan);

      if (sort) {
        aggregation.sort({ [sort]: sortOrder });
      }

      return aggregation;
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

module.exports = { plans };