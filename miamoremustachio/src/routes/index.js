const express = require('express');

const rootRouter = require('./root.routes');
const taskRouter = require('./task.routes');
const userRouter = require('./user.routes');

const router = express.Router();

router.use('/', rootRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);

module.exports = router;
