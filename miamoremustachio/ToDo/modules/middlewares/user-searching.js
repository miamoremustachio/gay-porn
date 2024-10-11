const { users } = require('../services/user-services.js');

const findUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await users.get(userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.locals.allowedId = user.id;
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }

  next();
}

module.exports = { findUser };