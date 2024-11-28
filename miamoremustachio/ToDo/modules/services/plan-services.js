const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Plan: PlanModel } = require('../models/plan-model.js');
const { SortField } = require('../helpers/sort-helper.js');

const plans = {
  model: PlanModel,
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
  getPaths() {
    return Object.keys(this.model.schema.paths);
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
}

function Plan(fields) {
  const paths = plans.getPaths();

  for (const field in fields) {
    if (paths.includes(field)) {
      this[field] = fields[field];
    }
  }

  if (fields.user) {
    this.user = fields.user;
  }
}

module.exports = {
  plans,
  Plan,
};