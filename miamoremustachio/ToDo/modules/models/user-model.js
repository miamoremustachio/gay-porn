const mongoose = require('mongoose');

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  NONBINARY: 'non-binary',
};

const { USER } = ROLES;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  gender: { type: String, enum: Object.values(GENDERS) },
  age: { type: Number, min: 7, max: 120 },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], enum: Object.values(ROLES), default: [USER] },
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };