const { UnauthorizedException } = require('../exceptions');
const { getAuthHeader } = require('../../shared/helpers/get-auth-header.helper');

function authGuard(req, res, next) {
  const userId = getAuthHeader(req);
    
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
