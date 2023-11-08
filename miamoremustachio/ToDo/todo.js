const {
  STATUSES,
  PRIORITIES,
} = require('./modules/constants.js');

const {
  checkTitle,
  checkStatus,
  checkPriority,
} = require('./modules/checking.js');

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;

function Task(title) {
  this.title = title;
  this.status = TO_DO;
  this.priority = LOW;
}

const toDo = {
  list: [
    {
      title: "defeat all the frickin' ants",
      status: DONE,
      priority: HIGH,
    },
    {
      title: "get ready for a battle with mongooses",
      status: TO_DO,
      priority: HIGH,
    },
    {
      title: "become super backender-shmackender",
      status: IN_PROGRESS,
      priority: LOW,
    },
  ],
  add({ title, status, priority }) {
      checkTitle(title, this.list);

      const task = new Task(title);

      if (status) {
        checkStatus(status);
        task.status = status;
      }

      if (priority) {
        checkPriority(priority);
        task.priority = priority;
      }
      
      toDo.list = [...toDo.list, task];
  },
}

module.exports = { toDo };