const { UnauthorizedError } = require('../errors/unauthorized-error.js');
const { ForbiddenError } = require('../errors/forbidden-error.js');

const checkUserId = (req, res, next) => {
  const userId = req.headers.authorization;
  const allowedId = res.locals.allowedId;

  try {
    if (!userId) {
      throw new UnauthorizedError();
    }
    
    if (userId !== allowedId) {
      throw new ForbiddenError();
    }
  
    next();
  
  } catch(error) {
    next(error);
  }
}

module.exports = { checkUserId };