const {
  STATUSES,
  PRIORITIES,
} = require('./modules/constants.js');

const {
  checkTitle,
  checkStatus,
  checkPriority,
  getTask,
} = require('./modules/checking.js');

const { randomUUID: getId } = require('crypto');

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;

function Task(title) {
  this.id = getId();
  this.title = title;
  this.status = TO_DO;
  this.priority = LOW;
}

const toDo = {
  list: [
    {
      id: "4243bdf5-9b01-4145-98cd-1b79e198b1fd",
      title: "defeat all the frickin' ants",
      status: DONE,
      priority: HIGH,
    },
    {
      id: "e78037d0-f058-4104-934c-6966e476d61a",
      title: "get ready for a battle with mongooses",
      status: TO_DO,
      priority: HIGH,
    },
    {
      id: "98bb63d2-3f3b-4588-978d-8d4baaf86e13",
      title: "become super backender-shmackender",
      status: IN_PROGRESS,
      priority: LOW,
    },
  ],
  add({ title, status, priority }) {
    checkTitle(title);

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
  edit({ id, title, status, priority }) {
    const task = getTask(id, this.list);

    if (title) {
      checkTitle(title);
    }

    if (status) {
      checkStatus(status);
    }
    
    if (priority) {
      checkPriority(priority);
    }
    
    task.title = title || task.title;
    task.status = status || task.status;
    task.priority = priority || task.priority;
  },
  delete(id) {
    this.list = this.list.filter(task => task.id !== id);
  }
}

module.exports = { toDo };