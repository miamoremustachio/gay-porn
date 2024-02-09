const { users } = require('../services/user-services.js');
const { NotFoundError } = require('../errors/not_found-error.js');

const findUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await users.get(userId);

    if (!user) {
      throw new NotFoundError();
    }

    res.locals.allowedId = user.id;
  
    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { findUser };