const ERROR = {
    INVALID_TASK: "Invalid task format: only strings are allowed.",
    INVALID_POSITION: "Incorrect position: you can use only 'start' or 'end'.",
    TASK_EXIST: "Task you want to add is already exist.",
    TASK_NOT_FOUND: "The task can't be deleted because it wasn't found in the list.",
};

const toDoList = ['pay bills', 'wash the dishes', 'enslave all the inhabitants of the galaxy'];


function isTaskValid(task) {
    return (typeof task === 'string') ? true : false;
}

function isTaskInList(task) {
    return toDoList.includes(task) ? true : false;
}

function isPositionValid(pos) {
    return (Number.isInteger(pos) && 0 < pos && pos <= toDoList.length) ? true : false;
}


function addTask(task, position = 'end') {
    if (!isTaskValid(task)) { 
        return console.error(ERROR.INVALID_TASK);
    };
    
    if (isTaskInList(task)) { 
        return console.error(ERROR.TASK_EXIST);
    };

    switch (position) {
        case 'end':
            toDoList.push(task);
            break;
        case 'start':
            toDoList.unshift(task);
            break;
        default:
            console.error(ERROR.INVALID_POSITION);
    };
}

function deleteTask(taskPos = 'end') {
    switch (taskPos) {
        case 'end':
            toDoList.pop();
            return;
        case 'start':
            toDoList.shift();
            return;
    };

    if (isPositionValid(taskPos)) {
        toDoList.splice(--taskPos, 1);
    } else if (toDoList.includes(taskPos)) {
        toDoList.splice(toDoList.indexOf(taskPos), 1);
    } else {
        return console.error(ERROR.TASK_NOT_FOUND);
    };
}

function showList() {
    console.log('To Do:');
    for (const task in toDoList) {
        console.log('\t' + toDoList[task]);
    };
}

// testing:
addTask(); // [error: invalid task]
addTask('foo'); // Successfully added to the end
addTask('bar', 'start'); // Successfully added to the beginning
addTask('wash the dishes'); // [error: task exist]
addTask('smthing', 'smwhere'); // [error: invalid position]
showList();

deleteTask(); // Delete the last task (by default)
deleteTask('start', 'pay bills'); // Delete the first task (second argument doesn't matter)
deleteTask('pay bills'); // Delete task by name
deleteTask(1); // Delete task by number (not by index!)
deleteTask(42); // [error: task not found]
deleteTask('enlist the support of cats'); // [error: task not found]
showList();