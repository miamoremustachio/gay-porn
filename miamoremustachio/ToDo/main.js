require('dotenv').config();

const express = require('express');

const {
  PORT,
  START_MESSAGE,
} = require('./modules/helpers/constants.js');
const { setHeaders } = require('./modules/middlewares/CORS.js');
const { router: taskRouter } = require('./modules/routes/task.js');
const { router: userRouter } = require('./modules/routes/user.js');
const { connectDatabase } = require('./modules/database/connection.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.use('/tasks', taskRouter);
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