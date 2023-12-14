const { tasks } = require('./task-services.js');

const subtasks = {
  collection: tasks,
  getParent(subtask) {
    return subtask.parent();
  },
  complete(subtask) {
    subtask.completed = true;
  },
  edit(subtask, completed, updated) {
    completed ? this.complete(subtask) : null;
    subtask.title = updated.title || subtask.title;
  },
  async create(taskId, doc) {
    const task = await this.collection.get(taskId);

    task.subtasks.push(doc);
    await task.save();

    const subtask = task.subtasks.at(-1);
    return subtask;
  },
  async get(taskId, subtaskId) {
    const task = await this.collection.get(taskId);
    const subtask = task.subtasks.id(subtaskId);
    return subtask;
  },
  async getAll(taskId) {
    const task = await this.collection.get(taskId);
    return task.subtasks;
  },
  async update(taskId, subtaskId, query) {
    const subtask = await this.get(taskId, subtaskId);
    const { completed, ...updated } = query;

    this.edit(subtask, completed, updated);
    await subtask.parent().save();

    return subtask;
  },
  async delete(taskId, subtaskId) {
    const subtask = await this.get(taskId, subtaskId);
  
    subtask.deleteOne();
    await subtask.parent().save();
  },
}

module.exports = { subtasks };