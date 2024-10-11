module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({}, { $set: { deadline: new Date(2024, 1, 26) } });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({}, { $unset: { deadline: "" } });
  }
};
