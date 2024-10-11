function Plan({ title, userId, tasks }) {
  this.title = title;
  this.user = userId;
  
  if (tasks) {
    this.tasks = tasks;
  }
}

function UpdatedPlan({ title }) {
  if (title) {
    this.title = title;
  }
}

module.exports = { Plan, UpdatedPlan };