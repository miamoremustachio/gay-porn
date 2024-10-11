const express = require('express');

const { setHeaders } = require('./modules/middlewares/CORS.js');
const { START_MESSAGE } = require('./modules/helpers/constants.js');
const { router: planRouter } = require('./modules/routes/plan-routes.js');
const { router: taskRefsRouter } = require('./modules/routes/task_refs-routes.js');
const { router: taskRouter } = require('./modules/routes/task-routes.js');
const { router: subtaskRouter } = require('./modules/routes/subtask-routes.js');
const { router: userRouter } = require('./modules/routes/user-routes.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.use('/plans', planRouter, taskRefsRouter);
app.use('/tasks', taskRouter, subtaskRouter);
app.use('/users', userRouter);

module.exports = { app };