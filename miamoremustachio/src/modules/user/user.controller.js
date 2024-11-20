const UserService = require('./user.service');

class UserController {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }
  
  async registerUser(req, res, next) {
    const body = req.body;
  
    try {
      const user = await this.userService.registerUser(body);
      
      res.status(201).json(user);
  
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    const userId = req.params.userId;

    try {
      const user = await this.userService.getUser(userId);

      res.json(user);

    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();

      res.json(users);

    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    const userId = req.params.userId;
    const body = req.body;

    try {
      const user = await this.userService.updateUser(userId, body);

      res.json(user);

    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    const userId = req.params.userId;

    try {
      await this.userService.deleteUser(userId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
