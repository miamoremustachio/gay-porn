const { User } = require('../models/user.js');
const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { USER_NOT_FOUND } = ERROR_MESSAGES;

const findUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    res.locals.allowedId = user._id;
  } catch(error) {
    return res.status(404).send(error.message);
  }

  next();
}

module.exports = { findUser };