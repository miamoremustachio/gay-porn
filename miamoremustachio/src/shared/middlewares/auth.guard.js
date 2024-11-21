const { UnauthorizedException } = require('../exceptions');

function authGuard(req, res, next) {
  const userId = req.get('Authorization');
    
  try {
    if (!userId) {
      throw new UnauthorizedException();
    }

    next();

  } catch (err) {
    next(err);
  }
}

module.exports = authGuard;
