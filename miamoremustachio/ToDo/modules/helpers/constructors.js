function UpdatedTask({ id, title, status, priority }) {
  this.id = id;
  
  if (title) {
    this.title = title;
  }

  if (status) {
    this.status = status;
  }
  
  if (priority) {
    this.priority = priority;
  }
}

module.exports = { UpdatedTask };