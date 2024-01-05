const { Task: TaskModel } = require('../models/task-model.js');
const { SortField } = require('../helpers/sort-helper.js');
const { getDateLimit } = require('../helpers/time-helper.js');

const tasks = {
  model: TaskModel,
  userProjection: [ 'username', 'email' ],
  create(doc) {
    return this.model.create(doc);
  },
  get(id) {
    return this.model.findById(id).populate('user', this.userProjection);
  },
  getAll(filter) {
    const { deadline, sort, ['sort-order']: sortOrder, ...restFields } = filter;

    const query = this.model.find(restFields)
      .populate('user', this.userProjection);
      
    if (deadline) {
      query.where('deadline').gt(new Date()).lte(getDateLimit(deadline));
    }

    if (sort) {
      const sortField = new SortField(sort, sortOrder);
      query.sort(sortField);
    }

    return query.exec();
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
};

function Task(fields) {
  const taskPaths = tasks.getPaths();

  for (const field in fields) {
    if (taskPaths.includes(field)) {
      this[field] = fields[field];
    }
  }

  if (fields.user) {
    this.user = fields.user;
  }
}

module.exports = {
  tasks,
  Task,
};