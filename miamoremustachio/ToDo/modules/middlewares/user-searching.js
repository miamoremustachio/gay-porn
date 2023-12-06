const { users } = require('../services/user-services.js');

const findUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await users.get(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    res.locals.allowedId = user.id;
  } catch(error) {
    return res.status(500).send(error.message);
  }

  next();
}

module.exports = { findUser };