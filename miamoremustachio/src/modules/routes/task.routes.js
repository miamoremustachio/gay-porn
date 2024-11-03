const express = require('express');
const toDo = require('../todo');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(toDo.list);
  })
    
  .post((req, res) => {
    const task = req.body;
    
    toDo.add(task);

    res.sendStatus(201);
  });

module.exports = router;
