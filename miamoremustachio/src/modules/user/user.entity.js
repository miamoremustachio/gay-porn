const mongoose = require('mongoose');

const { VALID_EMAIL, ROLE } = require('./user.const');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return VALID_EMAIL.test(v);
      },
      message: props => `${props.value} is not a valid email address.`,
    },
  },
  roles: {
    type: [String],
    required: true,
    enum: Object.values(ROLE),
    default: ROLE.USER,
  },
});

const UserEntity = mongoose.model('User', userSchema);

module.exports = UserEntity;
