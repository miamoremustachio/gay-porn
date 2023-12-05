const { ROLES } = require('../modules/helpers/constants.js');
const { USER } = ROLES;

module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { roles: [USER] } });
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { roles: "" } });
  }
};
