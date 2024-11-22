const DEFAULT_ROLE = 'user';

module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({ roles: { $exists: false } }, { $set: { roles: [DEFAULT_ROLE] } });
  },

  async down(db, client) {
    await db.collection('users').updateMany({ roles: { $exists: true } }, { $unset: { roles: '' } });
  }
};
