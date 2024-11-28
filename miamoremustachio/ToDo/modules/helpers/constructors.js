function Query({ title, status, priority }) {  
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

module.exports = { Query };