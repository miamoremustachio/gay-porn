const { Task } = require('../models/task-model.js');
const { getDateLimit } = require('../helpers/task-helper.js');

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
    const { deadline, ...restParams } = filter;
    const query = this.model.find(restParams)
      .populate('user', this.userProjection);
      
    if (deadline) {    
      query.where('deadline').gte(new Date()).lt(getDateLimit(deadline));
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