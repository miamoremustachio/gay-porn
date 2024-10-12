module.exports.ERROR = {
  OOPS: 'Oops! Some shit happened!',
};

module.exports.getTodoList = function(tasksArray) {
  return tasksArray.map(task => {
      const checkMark = task.completed ? '☑' : '☐';

      return `\n\t ${checkMark} ${task.title}`;
    });
}