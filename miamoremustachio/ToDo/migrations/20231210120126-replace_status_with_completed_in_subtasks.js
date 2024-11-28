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
      $set: { 'subtasks.$[].status': 'to do' },
      $unset: { 'subtasks.$[].completed': '' },
    });
  }
};
