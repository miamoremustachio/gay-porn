const { TASK_STATUSES } = require('../modules/models/task-model.js');
const { TO_DO } = TASK_STATUSES;

module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({
      'subtasks.status': { $exists: true },
    },
    {
      $set: { 'subtasks.$[].completed': false },
      $unset: { 'subtasks.$[].status': '' },
    });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({
      'subtasks.completed': { $exists: true },
    },
    {
      $set: { 'subtasks.$[].status': TO_DO },
      $unset: { 'subtasks.$[].completed': '' },
    });
  }
};
