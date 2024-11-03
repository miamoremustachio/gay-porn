const express = require('express');
const toDo = require('../todo');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(toDo.list);
  })
    
  .post((req, res, next) => {
    const task = req.body;
    
    try {
      toDo.add(task);
  
      res.sendStatus(201);
      
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
