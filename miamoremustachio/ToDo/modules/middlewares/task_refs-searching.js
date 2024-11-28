const findTaskRef = (req, res, next) => {
  const taskId = req.params.taskId;
  const taskRefs = res.locals.taskRefs;

  try {
    const taskRef = taskRefs.find(taskRef => taskId === taskRef.toString());

    if (!taskRef) {
      res.sendStatus(404);
      return;
    }
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }

  next();
}

module.exports = { findTaskRef };