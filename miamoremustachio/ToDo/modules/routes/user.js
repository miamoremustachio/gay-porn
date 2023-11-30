const express = require('express');

const { User } = require('../models/user.js');
const { findUser } = require('../middlewares/user_searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const usersList = await User.find();

      res.json(usersList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userProperties = req.body;

    try {
      const user = new User(userProperties);

      await user.save();

      const userPath = `${req.baseUrl}${req.path}${user.id}`;

      res.send(userPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id')
  .all(findUser, checkUserId)
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id);
      
      res.json(user);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const query = req.body;
    const options = { returnDocument: "after" };

    try {
      const result = await User.findByIdAndUpdate(id, query, options);

      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await User.findByIdAndDelete(id);

      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };