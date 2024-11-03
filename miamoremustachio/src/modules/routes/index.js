const express = require('express');

const rootRouter = require('./root.routes');
const taskRouter = require('./task.routes');

const router = express.Router();

router.use('/', rootRouter);
router.use('/tasks', taskRouter);

module.exports = router;
