const { USER_ROLES } = require('../modules/models/user-model.js');
const { USER } = USER_ROLES;

module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { roles: [USER] } });
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { roles: '' } });
  }
};
