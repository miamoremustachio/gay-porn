const express = require('express');

const { UserController } = require('../modules/user');

const router = express.Router();
const userController = new UserController();

router.route('/')
  .post(userController.registerUser.bind(userController));

router.route('/:id')
  .get(userController.getUser.bind(userController));

module.exports = router;
