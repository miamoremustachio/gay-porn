module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $unset: { fullName: '' } });
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $set: { fullName: 'Oleg' } });
  }
};
