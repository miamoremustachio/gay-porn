const { PORT } = require('./config/app-config.js');

const express = require('express');

const { START_MESSAGE } = require('./modules/helpers/constants.js');
const { setHeaders } = require('./modules/middlewares/CORS.js');
const { router: planRouter } = require('./modules/routes/plan-routes.js');
const { router: taskRouter } = require('./modules/routes/task-routes.js');
const { router: subtaskRouter } = require('./modules/routes/subtask-routes.js');
const { router: userRouter } = require('./modules/routes/user-routes.js');
const { connectDatabase } = require('./modules/database/connection.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.use('/plans', planRouter);
app.use('/tasks', taskRouter, subtaskRouter);
app.use('/users', userRouter);

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

  } catch(error) {
    console.error(error.message);
  }
}

start();