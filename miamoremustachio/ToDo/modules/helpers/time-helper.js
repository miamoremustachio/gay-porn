function getDefaultDeadline() {
  const taskCreationTime = new Date();
  const deadlineMonth = taskCreationTime.getMonth() + 1;
  const deadline = new Date(taskCreationTime.setMonth(deadlineMonth));

  return deadline;
}

// #ToDo: add date-fns package
function getNextDay() {
  const currentTime = new Date();
  const nextDay = currentTime.getDate() + 1;
  const nextDayDate = new Date(currentTime.setDate(nextDay));
  const nextDayStarting = new Date(nextDayDate.toDateString());

  return nextDayStarting;
}

function getNextWeek() {
  const currentTime = new Date();
  const nextWeek = currentTime.getDate() + 7;
  const nextWeekStarting = new Date(currentTime.setDate(nextWeek));

  return nextWeekStarting;
}

function getDateLimit(deadline) {
  switch (deadline) {
    case 'today':
      return getNextDay();
    case 'week':
      return getNextWeek();
  }
}

module.exports = {
  getDefaultDeadline,
  getDateLimit,
};