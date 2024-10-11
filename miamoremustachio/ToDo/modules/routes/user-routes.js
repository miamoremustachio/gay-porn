const express = require('express');

const { users } = require('../services/user-services.js');
const { findUser } = require('../middlewares/user-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const usersList = await users.getAll();

      res.json(usersList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userProperties = req.body;

    try {
      const user = await users.create(userProperties);
      const userPath = `${req.baseUrl}${req.path}${user.id}`;

      res.send(userPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id')
  .all(findUser, checkUserId)
  .get(async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await users.get(userId);
      
      res.json(user);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const userId = req.params.id;
    const query = req.body;
    const options = { returnDocument: "after" };

    try {
      const user = await users.update(userId, query, options);

      res.json(user);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const userId = req.params.id;

    try {
      await users.delete(userId);

      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };