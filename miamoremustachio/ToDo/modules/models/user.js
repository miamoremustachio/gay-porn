const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  gender: String,
  age: Number,
  address: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };