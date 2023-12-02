const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { ACCESS_FORBIDDEN } = ERROR_MESSAGES;

const checkUserId = (req, res, next) => {
  const userId = req.get('Authorization');
  const allowedId = res.locals.allowedId;
  
  try {
    if (userId !== allowedId) {
      throw new Error(ACCESS_FORBIDDEN);
    }
  } catch(error) {
    return res.status(403).send(error.message);
  }

  next();
}

module.exports = { checkUserId };