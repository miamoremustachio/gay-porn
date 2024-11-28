const { BaseServices } = require('./base-services.js');
const { Task } = require('../models/task-model.js');
const { SortField } = require('../helpers/sort-helper.js');
const { getDateLimit } = require('../helpers/time-helper.js');

class Services extends BaseServices {
  constructor(model) {
    super(model);
    this.projections = {
      user: [ 'username', 'email' ],
    };
  }

  get(id) {
    return this.model.findById(id).populate('user', this.projections.user);
  }

  getAll(filter) {
    const { deadline, sort, ['sort-order']: sortOrder, ...restFields } = filter;
  
    const query = this.model.find(restFields)
      .populate('user', this.projections.user);
      
    if (deadline) {
      query.where('deadline').gt(new Date()).lte(getDateLimit(deadline));
    }
  
    if (sort) {
      const sortField = new SortField(sort, sortOrder);
      query.sort(sortField);
    }
  
    return query.exec();
  }
}

const tasks = new Services(Task);

module.exports = { tasks };