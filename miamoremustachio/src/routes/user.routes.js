const express = require('express');

const { UserController, UserValidator } = require('../modules/user');

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();
const { validateBody } = userValidator;

router.route('/')
  .get(userController.getAllUsers)
  .post(validateBody(), userController.registerUser);

router.route('/:userId')
  .get(userController.getUser)
  .put(validateBody(), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
