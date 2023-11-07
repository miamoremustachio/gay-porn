const {
  STATUSES,
  PRIORITIES,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const {
  checkArguments,
  checkTitle,
  checkStatus,
  checkPriority,
  checkTaskNumber,
  findTask,
} = require('./modules/checking.js');

const { showErrorMessage } = require('./modules/showing.js');
const { isDefined } = require('./modules/predicates.js');

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;
const { LOW, HIGH } = PRIORITIES;
const {
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_CHANGED_STATUS,
  SUCCESSFULLY_CHANGED_PRIORITY,
  SUCCESSFULLY_DELETED,
} = INFO_MESSAGES;

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
    try {
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
      
      console.log('✓', SUCCESSFULLY_ADDED);
      console.log('\t', task);
        
    } catch(error) {
      showErrorMessage(error);
    }
  },
  edit({ title, status, priority }) {
    try {
      checkArguments(arguments);

      const task = findTask(title, this.list);

      if (status) {
        checkStatus(status);
        task.status = status;

        console.log('✓', SUCCESSFULLY_CHANGED_STATUS);
      }

      if (priority) {
        checkPriority(priority);
        task.priority = priority;

        console.log('✓', SUCCESSFULLY_CHANGED_PRIORITY);
      }

      console.log('\t', task);

    } catch(error) {
      showErrorMessage(error);
    }
  },
  delete({ title, number }) {
    try {
      checkArguments(arguments);

      const titleIsDefined = isDefined(title);
      const numberIsDefined = isDefined(number);

      if (titleIsDefined) {
        findTask(title, this.list);

        this.list = this.list.filter(task => task.title !== title); 

      } else if (numberIsDefined) {
        checkTaskNumber(number, this.list);

        const taskIndex = number - 1;
        const firstHalf = this.list.slice(0, taskIndex);
        const secondHalf = this.list.slice(taskIndex + 1);

        this.list = [...firstHalf, ...secondHalf];
      }

      console.log('✓', SUCCESSFULLY_DELETED);
      
    } catch(error) {
      showErrorMessage(error);
    }
  }
}