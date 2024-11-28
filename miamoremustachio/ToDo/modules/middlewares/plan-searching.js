const { plans } = require('../services/plan-services.js');

const findPlan = async (req, res, next) => {
  const planId = req.params.id;
  const taskId = req.params.taskId;

  try {
    const plan = await plans.get(planId);
    
    if (!plan) {
      res.sendStatus(404);
      return;
    }

    plan.depopulate('tasks');
    res.locals.taskRefs = (taskId) ? plan.tasks : undefined;
    res.locals.allowedId = plan.user.id;
  } catch(error) {
    res.status(500).send(error.message);
    return;
  }

  next();
}

module.exports = { findPlan };