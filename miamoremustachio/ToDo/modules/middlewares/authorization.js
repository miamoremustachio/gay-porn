const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { ACCESS_FORBIDDEN } = ERROR_MESSAGES;

const checkUserId = async (req, res, next) => {
  try {
    const userId = req.get('Authorization');
    const taskUserId = res.locals.taskUserId.toString();
  
    if (userId !== taskUserId) {
      throw new Error(ACCESS_FORBIDDEN);
    }

  } catch(error) {
    return res.status(403).send(error.message);
  }

  next();
}

module.exports = { checkUserId };