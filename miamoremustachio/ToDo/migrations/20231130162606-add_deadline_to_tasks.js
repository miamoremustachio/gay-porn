const { getDefaultDeadline } = require('../modules/helpers/time-helper.js');

module.exports = {
  async up(db, client) {
    await db.collection('tasks').updateMany({}, { $set: { deadline: getDefaultDeadline() } });
  },

  async down(db, client) {
    await db.collection('tasks').updateMany({}, { $unset: { deadline: '' } });
  }
};
