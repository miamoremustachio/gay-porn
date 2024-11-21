const express = require('express');

const rootRouter = require('./root.routes');
const planRouter = require('./plan.routes');
const taskRouter = require('./task.routes');
const subtaskRouter = require('./subtask.routes');
const userRouter = require('./user.routes');

const router = express.Router();

router.use('/', rootRouter);
router.use('/plan', planRouter);
router.use('/task', taskRouter, subtaskRouter);
router.use('/user', userRouter);

module.exports = router;
