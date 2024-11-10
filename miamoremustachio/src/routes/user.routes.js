const express = require('express');

const { UserController } = require('../modules/user');

const router = express.Router();
const userController = new UserController();

router.route('/')
  .get(userController.getAllUsers.bind(userController))
  .post(userController.registerUser.bind(userController));

router.route('/:id')
  .get(userController.getUser.bind(userController))
  .put(userController.updateUser.bind(userController))
  .delete(userController.deleteUser.bind(userController));

module.exports = router;
