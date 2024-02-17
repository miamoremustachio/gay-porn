const express = require('express');

const { users } = require('../services/user-services.js');
const { findUser } = require('../middlewares/searching/user-searching.js');
const { validateUser } = require('../middlewares/validation/user-validation.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const usersList = await users.getAll();

      res.json(usersList);
    } catch(error) {
      next(error);
    }
  })
  .post(validateUser, async (req, res, next) => {
    const fields = req.body;

    try {
      const user = await users.create(fields);
      const userPath = `${req.baseUrl}${req.path}${user.id}`;

      res.send(userPath);
    } catch(error) {
      next(error);
    }
  });

router.route('/:id')
  .all(findUser, checkUserId)
  .get(async (req, res, next) => {
    const userId = req.params.id;

    try {
      const user = await users.get(userId);
      
      res.json(user);
    } catch(error) {
      next(error);
    }
  })
  .put(validateUser, async (req, res, next) => {
    const userId = req.params.id;
    const update = req.body;
    const options = { returnDocument: 'after' };

    try {
      const user = await users.update(userId, update, options);

      res.json(user);
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const userId = req.params.id;

    try {
      await users.delete(userId);

      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  });

module.exports = { router };