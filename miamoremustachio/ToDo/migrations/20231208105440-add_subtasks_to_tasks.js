module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({ subtasks: { $exists: false } }, { $set: { subtasks: [] } });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({ subtasks: [] }, { $unset: { subtasks: '' }});
  }
};
