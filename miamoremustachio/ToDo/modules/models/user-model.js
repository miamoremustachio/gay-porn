const mongoose = require('mongoose');

const { ROLES } = require('../helpers/constants.js');
const { USER } = ROLES;

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  gender: String,
  age: Number,
  address: String,
  email: String,
  roles: { type: [String], default: [USER] },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };