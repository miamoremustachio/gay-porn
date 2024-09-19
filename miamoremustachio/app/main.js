const STATUSES = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const { TO_DO, IN_PROGRESS, DONE } = STATUSES;

const ERRORS = {
  TASK_EXIST: 'Error: Task you want to add is already in list.',
  TASK_NOT_FOUND: 'Error: Task not found.',
  INVALID_STATUS: `Error: Invalid status: it must be either "${TO_DO}", "${IN_PROGRESS}" or "${DONE}".`,
};

const { TASK_EXIST, TASK_NOT_FOUND, INVALID_STATUS } = ERRORS;

function showTasksByStatus(status, list) {
  let hasTasksWithThisStatus;

  const filteredList = list.filter((task) => task.status === status);

  filteredList.forEach((task) => {
    console.log(`\t ${task.id}. "${task.title}"`);
    hasTasksWithThisStatus = true;
  })

  if (!hasTasksWithThisStatus) console.log('\t -');
}

// TODO: add predicate function for status validation
const validate = {
  status(status) {
    const validStatusesList = Object.values(STATUSES);

    if (validStatusesList.includes(status)) {
      return;
    
    } else {
      console.error(INVALID_STATUS);
      return true;
    }
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
    { id: getId(), title: 'eat', status: TO_DO },
    { id: getId(), title: 'sleep', status: IN_PROGRESS },
    { id: getId(), title: 'code', status: DONE },
  ],
  add(title, status = TO_DO) {
    if (validate.status(status)) return;

    this.list.push({ id: getId(), title, status });
  },
  deleteById(taskId) {
    // TODO: add task seeking function
    const taskIndex = this.list.findIndex((task) => task.id === taskId);
    const task = this.list[taskIndex] || null;

    if (!task) {
      console.error(TASK_NOT_FOUND);
      return;
    };

    this.list.splice(taskIndex, 1);
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
  show() {
    for (let status in STATUSES) {
      const statusValue = STATUSES[status];

      console.log(`${statusValue}:`);
      showTasksByStatus(statusValue, this.list);
    }
  },
};

// TODO: add fixtures
toDo.show();

toDo.add('foo');
const testTask1 = toDo.list.find((task) => task.title === 'foo');
console.log(testTask1.title === 'foo'); // ✓ 

toDo.add('bar', DONE);
const testTask2 = toDo.list.find((task) => task.title === 'bar');
console.log(testTask2.status === DONE); // ✓

toDo.add('baz', '(invalid status)');
const testTask3 = toDo.list.find((task) => task.title === 'baz');
console.log(testTask3 === undefined); // ✓

toDo.deleteByTitle('foo');
const testTask4 = toDo.list.find((task) => task.title === 'foo');
console.log(testTask4 === undefined); // ✓

toDo.deleteByTitle('baz');
const testTask5 = toDo.list.find((task) => task.title === 'baz');
console.log(testTask5 === undefined); // ✓

toDo.deleteById(1);
const testTask6 = toDo.list.find((task => task.id === 1));
console.log(testTask6 === undefined); // ✓

toDo.deleteById('2');
const testTask7 = toDo.list.find((task) => task.id === 2);
console.log(Boolean(testTask7)); // ✓

toDo.show();

// feat: task ID
// add tasks array, add ID generator