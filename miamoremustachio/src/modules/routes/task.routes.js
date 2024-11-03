const express = require('express');
const toDo = require('../todo');
const { FilteredTask: Task } = require('../helpers/tasks.helper');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(toDo.list);
  })
    
  .post((req, res, next) => {
    try {
      toDo.add(new Task(req.body));
  
      res.sendStatus(201);
      
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
