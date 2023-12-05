function getDefaultDeadline() {
  const taskCreationTime = new Date();
  const deadlineMonth = taskCreationTime.getMonth() + 1;
  const deadline = new Date(taskCreationTime.setMonth(deadlineMonth));

  return deadline;
}

function Query({ title, status, priority, deadline }) {
  if (title) {
    this.title = title;
  }

  if (status) {
    this.status = status;
  }
  
  if (priority) {
    this.priority = priority;
  }

  if (deadline) {
    this.deadline = deadline;
  }
}

module.exports = {
  getDefaultDeadline,
  Query,
};