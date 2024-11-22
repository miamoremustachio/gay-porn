const express = require('express');

const { RootController } = require('../modules/root');

const router = express.Router();
const rootController = new RootController();

router.route('/')
  .get(rootController.get.bind(rootController));

module.exports = router;
