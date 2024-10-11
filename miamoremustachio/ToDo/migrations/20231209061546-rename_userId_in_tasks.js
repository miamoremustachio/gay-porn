module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({}, { $rename: { userId: 'user' } });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({}, { $rename: { user: 'userId' } });
  }
};
