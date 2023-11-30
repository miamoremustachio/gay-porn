module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { roles: "user" } });
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { roles: "" } });
  }
};
