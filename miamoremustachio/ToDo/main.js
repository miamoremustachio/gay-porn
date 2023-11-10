const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { checkId } = require('./modules/checking.js');
const { toDo } = require('./todo.js');
const express = require('express');

const {
  START_MESSAGE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  SUCCESSFULLY_DELETED,
} = INFO_MESSAGES;

const setCrossOriginHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const app = express();

app.use(setCrossOriginHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.route('/tasks')
  .get((req, res) => {
    res.json(toDo.list);
  })

  .post((req, res) => {
    const task = req.body;
    
    try {
      toDo.add(task);
      res.status(201).send(SUCCESSFULLY_ADDED);

    } catch(error) {
      res.status(400).send(error.message);
    }
  });

app.route('/tasks/:id')
  .put((req, res) => {
    const id = req.params.id;
    
    try {
      checkId(id, toDo.list);

    } catch(error) {
      return res.status(404).send(error.message);
    }

    const { title, status, priority } = req.body;

    const task = { id, title, status, priority };

    try {
      toDo.edit(task);
      res.send(SUCCESSFULLY_UPDATED);
    
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete((req, res) => {
    const id = req.params.id;

    try {
      checkId(id, toDo.list);
    
    } catch(error) {
      return res.status(404).send(error.message);
    }

    toDo.delete(id);
    res.send(SUCCESSFULLY_DELETED);
  })

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});