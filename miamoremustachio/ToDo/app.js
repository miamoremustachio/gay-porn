const express = require('express');

const { PORT } = require('./config/app-config.js');
const { setHeaders } = require('./modules/middlewares/CORS.js');
const { errorHandler } = require('./modules/middlewares/error-handling.js');
const { router: planRouter } = require('./modules/routes/plan-routes.js');
const { router: taskRefsRouter } = require('./modules/routes/task_refs-routes.js');
const { router: taskRouter } = require('./modules/routes/task-routes.js');
const { router: subtaskRouter } = require('./modules/routes/subtask-routes.js');
const { router: userRouter } = require('./modules/routes/user-routes.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.set('port', PORT);

app.get('/', (req, res) => {
  res.send('ToDo server is running :3');
});

app.use('/plans', planRouter, taskRefsRouter);
app.use('/tasks', taskRouter, subtaskRouter);
app.use('/users', userRouter);

app.use(errorHandler);

module.exports = { app };