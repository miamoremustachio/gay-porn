const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { toDo } = require('./todo.js');
const express = require('express');

const {
  START_MESSAGE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  SUCCESSFULLY_DELETED,
} = INFO_MESSAGES;

const app = express();

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

app.route('/tasks/:title')
  .put((req, res) => {
    const title = req.params.title;
    const status = req.body.status;
    const priority = req.body.priority;
    const task = { title, status, priority };

    try {
      toDo.edit(task);
      res.send(SUCCESSFULLY_UPDATED);

    } catch(error) {
      res.status(400).send(error.message);
    }
    
  })
  .delete((req, res) => {
    const title = req.params.title;

     try {
      toDo.delete(title);
      res.send(SUCCESSFULLY_DELETED);

     } catch(error) {
      res.status(404).send(error.message);
     }
  })

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});