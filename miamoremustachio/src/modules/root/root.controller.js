const { WELCOME_MESSAGE } = require('../../config/app.config');

class RootController {
  get(req, res, next) {
    try {
      res.send(WELCOME_MESSAGE);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RootController;
