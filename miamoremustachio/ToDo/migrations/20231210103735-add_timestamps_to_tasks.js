module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({
      createdAt: { $exists: false },
      updatedAt: { $exists: false },
    },
    {
      $set: {
        createdAt: new Date(0),
        updatedAt: new Date(0),
      },
    });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
    {
      $unset: {
        createdAt: '',
        updatedAt: '',
      },
    });
  }
};
