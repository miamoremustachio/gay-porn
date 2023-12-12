const { Plan } = require('../models/plan-model.js');

const plans = {
  model: Plan,
  taskProjection: [ '-user' ],
  userProjection: [ 'username', 'email' ],
  save(plan) {
    return plan.save();
  },
  create(doc) {
    return this.model.create(doc);
  },
  addTask(tasksList, task) {
    return tasksList.push(task);
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
  getTask(tasksList, taskId) {
    return tasksList?.find(task => taskId === task._id.toString());
  },
  update(id, query, options) {
    return this.model.findByIdAndUpdate(id, query, options);
  },
  delete(id) {
    return this.model.findByIdAndDelete(id);
  },
  deleteTask(tasksList, taskId) {
    return tasksList.filter(task => taskId !== task._id.toString());
  },
}

module.exports = { plans };