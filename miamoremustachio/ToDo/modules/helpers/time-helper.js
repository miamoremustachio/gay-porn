const {
  addMonths,
  endOfDay,
  endOfWeek,
  endOfMonth,
  addWeeks,
 } = require('date-fns');

function getDefaultDeadline() {
  const deadline = addMonths(new Date(), 1);
  return deadline;
}

function getDateLimit(deadline) {
  const currentDate = new Date();

  switch (deadline) {
    case 'today':
      return endOfDay(currentDate);
    case 'week':
      return addWeeks(currentDate, 1);
    case 'this-week':
      return endOfWeek(currentDate);
    case 'month':
      return addMonths(currentDate, 1);
    case 'this-month':
      return endOfMonth(currentDate);
  }
}

module.exports = {
  getDefaultDeadline,
  getDateLimit,
};