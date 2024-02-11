const mongoose = require('mongoose');

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const { USER } = USER_ROLES;

const userSchema = new mongoose.Schema({
  username: String,
  gender: String,
  age: Number,
  address: String,
  email: String,
  roles: { type: [String], default: [USER] },
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = { USER_ROLES, User };