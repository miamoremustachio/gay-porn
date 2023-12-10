const { tasks } = require('./task-services.js');

const subtasks = {
  collection: tasks,
  getParent(subtask) {
    return subtask.parent();
  },
  saveParent(task) {
    return task.save();
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
  async delete(taskId, subtaskId) {
    const subtask = await this.get(taskId, subtaskId);
    subtask.deleteOne();

    const task = subtask.parent();
    await task.save();
  },
}

module.exports = { subtasks };