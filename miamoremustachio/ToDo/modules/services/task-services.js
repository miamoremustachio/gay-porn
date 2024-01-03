const { Task } = require('../models/task-model.js');
const { SortField } = require('../helpers/task-helper.js');
const { getDateLimit } = require('../helpers/time-helper.js');

const tasks = {
  model: Task,
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
      query.where('deadline').gt(new Date()).lt(getDateLimit(deadline));
    }

    if (sort) {
      const sortField = new SortField(sort, sortOrder);
      query.sort(sortField);
    }

    return query.exec();
  },
  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
};

module.exports = { tasks };