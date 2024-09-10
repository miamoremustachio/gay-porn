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
  let i = 0;

  for (let task in list) {
    if (list[task] === status) {
      console.log(`\t "${task}"`);
      i++;
    }
  }

  if (!i) console.log('\t -');
}

const validate = {
  task: {
    exist(task, list) {
      if (task in list) {
        console.error(TASK_EXIST);
        return true;
      }
    },
    notFound(task, list) {
      if (!(task in list)) {
        console.error(TASK_NOT_FOUND);
        return true;
      }
    },
  },
  status(status) {
    if (status === TO_DO || status === IN_PROGRESS || status === DONE) {
      return;
    
    } else {
      console.error(INVALID_STATUS);
      return true;
    }
  },
};

const toDo = {
  list: {
    'eat': TO_DO,
    'sleep': IN_PROGRESS,
    'code': DONE,
  },
  add(task, status = TO_DO) {
    if (validate.task.exist(task, this.list)) return;
    if (validate.status(status)) return;

    this.list[task] = status;
  },
  delete(task) {
    if (validate.task.notFound(task, this.list)) return;

    delete this.list[task];
  },
  changeStatus(task, status) {
    if (validate.task.notFound(task, this.list)) return;
    if (validate.status(status)) return;

    this.list[task] = status;
  },
  show() {
    for (let status in STATUSES) {
      const statusValue = STATUSES[status];

      console.log(`${statusValue}:`);
      showTasksByStatus(statusValue, this.list);
    }
  },
};

// tests:
toDo.show();

toDo.add('foo');
console.log(toDo.list.foo === TO_DO); // ✓

toDo.add('bar', DONE);
console.log(toDo.list.bar === DONE); // ✓

toDo.add('bar', TO_DO);
console.log(toDo.list.bar === DONE); // ✓

toDo.add('baz', '(invalid status)');
console.log(toDo.list.baz === undefined); // ✓

toDo.changeStatus('foo', DONE);
console.log(toDo.list.foo === DONE); // ✓

toDo.changeStatus('foo', '(invalid status)');
console.log(toDo.list.foo === DONE); // ✓

toDo.changeStatus('baz', DONE);
console.log(toDo.list.baz === undefined); // ✓

toDo.delete('foo');
console.log(toDo.list.foo === undefined); // ✓

toDo.delete('baz');
console.log(toDo.list.baz === undefined); // ✓

toDo.show();