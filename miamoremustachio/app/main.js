const STATUSES = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;

const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

const { LOW, MEDIUM, HIGH } = PRIORITIES;
// TODO: add namespace for tasks properties

const ERRORS = {
  TASK_EXIST: 'Error: Task you want to add is already in list.',
  TASK_NOT_FOUND: 'Error: Task not found.',
  INVALID_STATUS: `Error: Invalid status: it must be either "${Object.values(STATUSES).join(', ')}.`,
  INVALID_PRIORITY: `Error: Invalid priority: it must be either ${Object.values(PRIORITIES).join(', ')}.`,
};

const { TASK_EXIST, TASK_NOT_FOUND, INVALID_STATUS, INVALID_PRIORITY } = ERRORS;

function showTasksByStatus(status, list) {
  let hasTasksWithThisStatus;

  const filteredList = list.filter((task) => task.status === status);

  filteredList.forEach((task) => {
    console.log(`\t ${task.id}. "${task.title}"`);
    hasTasksWithThisStatus = true;
  })

  if (!hasTasksWithThisStatus) console.log('\t -');
}

function isStatusValid(status) {
  const validStatusesList = Object.values(STATUSES);
  
  return validStatusesList.includes(status);
}

function isPriorityValid(priority) {
  const validPrioritiesList = Object.values(PRIORITIES);

  return validPrioritiesList.includes(priority);
}

const validationLayer = {
  // TODO: add title validation
  'status': {
    fn: isStatusValid,
    errorMessage: INVALID_STATUS,
  },
  'priority': {
    fn: isPriorityValid,
    errorMessage: INVALID_PRIORITY, 
  },
};

function* generateIds() {
  let id = 1;

  while(true) {
    yield id++;
  }
}

const idGenerator = generateIds();
const getId = () => idGenerator.next().value;

const toDo = {
  list: [
    { id: getId(), title: 'eat', status: TO_DO, priority: LOW },
    { id: getId(), title: 'sleep', status: IN_PROGRESS, priority: MEDIUM },
    { id: getId(), title: 'code', status: DONE, priority: HIGH },
  ],
  add(title, status = TO_DO, priority = MEDIUM) {
    // TODO: insert validation layer
    if (!isStatusValid(status)) {
      console.error(INVALID_STATUS);
      return;
    }

    if (!isPriorityValid(priority)) {
      console.error(INVALID_PRIORITY);
      return;
    }

    const newTask = this.list.push({ id: getId(), title, status, priority });
    return newTask;
  },
  deleteById(taskId) {
    const taskIndex = this.list.findIndex((task) => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    };
    const deleted = this.list.splice(taskIndex, 1);
    return deleted;
  },
  deleteByTitle(title) {
    const taskIndex = this.list.findIndex((task) => task.title === title);
    const task = this.list[taskIndex] || null;

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    };

    this.list.splice(taskIndex, 1);
  },
  changeTask(taskId, propertyKey, propertyValue) {
    const task = this.list.find((task) => task.id === taskId);

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    }

    const { fn: validateProperty, errorMessage } = validationLayer[propertyKey];

    if (!validateProperty(propertyValue)) {
      console.error(errorMessage);
      return;
    }

    task[propertyKey] = propertyValue;
    return task;
  },
  showTaskList() {
    for (let status in STATUSES) {
      const statusValue = STATUSES[status];

      console.log(`${statusValue}:`);
      showTasksByStatus(statusValue, this.list);
    }
  },
};

const fixtures = {
  titles: {
    valid: [ 'foo', 'bar', 'baz' ],
  },
  statuses: {
    invalid: 'a',
  },
  ids: {
    valid: [ 1, 2, 3 ],
    invalid: [ '1', '2', '3' ],
  },
};

const validTitles = [ ...fixtures.titles.valid ];
const invalidStatus = fixtures.statuses.invalid;
const validIds = [ ...fixtures.ids.valid ];
const invalidIds = [ ...fixtures.ids.invalid ];

toDo.showTaskList();

// TODO: add tests for tasks changing
toDo.add(validTitles[0]);
const testTask1 = toDo.list.find((task) => task.title === validTitles[0]);
console.log(testTask1.title === validTitles[0]); // ✓

toDo.add(validTitles[1], DONE);
const testTask2 = toDo.list.find((task) => task.title === validTitles[1]);
console.log(testTask2.status === DONE); // ✓

toDo.add(validTitles[2], invalidStatus);
const testTask3 = toDo.list.find((task) => task.title === validTitles[2]);
console.log(testTask3 === undefined); // ✓

toDo.deleteByTitle(validTitles[0]);
const testTask4 = toDo.list.find((task) => task.title === validTitles[0]);
console.log(testTask4 === undefined); // ✓

toDo.deleteByTitle(validTitles[2]);
const testTask5 = toDo.list.find((task) => task.title === validTitles[2]);
console.log(testTask5 === undefined); // ✓

toDo.deleteById(validIds[0]);
const testTask6 = toDo.list.find((task => task.id === validIds[0]));
console.log(testTask6 === undefined); // ✓

toDo.deleteById(invalidIds[1]);
const testTask7 = toDo.list.find((task) => task.id === validIds[1]);
console.log(Boolean(testTask7)); // ✓

toDo.showTaskList();