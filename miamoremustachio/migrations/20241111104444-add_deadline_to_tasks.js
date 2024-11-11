const ONE_WEEK = 6.048e8;
const DEADLINE_DATE = new Date(Date.now() + ONE_WEEK);

module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({ deadline: { $exists: false } }, { $set: { deadline: DEADLINE_DATE } });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({ deadline: { $exists: true } }, { $unset: { deadline: '' } });
  }
};
