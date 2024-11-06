const express = require('express');

const { WELCOME_MESSAGE } = require('../../config/app.config');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(WELCOME_MESSAGE);
  });

module.exports = router;
