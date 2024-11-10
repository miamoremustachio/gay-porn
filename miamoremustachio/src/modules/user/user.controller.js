const UserService = require('./user.service');

class UserController {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }
  
  async registerUser(req, res, next) {
    const body = req.body;
  
    try {
      const user = await this.userService.registerUser(body);
      
      res.status(201).send(user);
  
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await this.userService.getUser(userId);

      res.json(user);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
