const toDo = {
    list: {
    "Learn JavaScript at least 3 hours": "In progress",
    "Eat pizza": "To Do",
    "Find all the missing socks": "To Do",
    "Reflect on the ephemerality of being": "To Do"
    }
};

function changeStatus(task, status) {
    let isTaskExist;

    if (typeof status == 'undefined') {
        return console.log(`
        Seems like you've forgotten to set the second argument in function.
        Please, set task's status as a second function's argument and try again.`);
    } else if (status.toLowerCase() != 'to do'
    & status.toLowerCase() != 'in progress'
    & status.toLowerCase() != 'done') {
        return console.log(`
        You can only use 'to do', 'in progress' or 'done' variables for task's status. 
        Please, change the variable you want to set and try again.`);
    };

    for (const existedTask in toDo.list) {
        if (existedTask.toLowerCase() == task.toLowerCase()) {
            toDo.list[existedTask] = status;
            isTaskExist = true;
        };
    };

    if (isTaskExist !== true) {
        console.log(`
        You are trying to change status of task that doesn't exist.
        Please, add "${task}" in ToDo list by using the addTask() function.`);
    };
};

function addTask(task) {
    let isTaskExist;

    for (const existedTask in toDo.list) {
        if (existedTask.toLowerCase() == task.toLowerCase()) {
            console.log(`
            The task you want to add is already exist.
            If you want to change its status, use the changeTask() function.`);
            isTaskExist = true;
        };
    };

    if (isTaskExist !== true) {
    toDo.list[task] = undefined;
    };
};

function deleteTask(task) {
    let isTaskExist;

    for (const existedTask in toDo.list) {
        if (existedTask.toLowerCase() == task.toLowerCase()) {
            delete toDo.list[existedTask];
            isTaskExist = true;
        };
    };

    if (isTaskExist !== true) {
        console.log(`
        You are trying to delete the task that doesn't exist.
        Please, check the correctness of data you entered and try again.
        You can also list all existed tasks by using the showList() function.`);
    };
};

function showList() {

    for (const task in toDo.list) {

        if (toDo.list[task] == undefined) {
            return console.log(`
            Seems like you've forgotten to specify the status of the "${task}" task.
            To set the status of any task use the changeStatus() function.`);
        } else if (toDo.list[task].toLowerCase() == "to do") {
            console.log(`${[task]}: To Do`);

        } else if (toDo.list[task].toLowerCase() == "in progress") {
            console.log(`${[task]}: In progress`);

        } else if (toDo.list[task].toLowerCase() == "done") {
            console.log(`${[task]}: Done`);
        }

    };

    let isDone;

    for (const task in toDo.list) {
        if (toDo.list[task].toLowerCase() == "done") {
            isDone = true;
        };
    };

    if (isDone !== true) {
    console.log(`
    Nothing is done.`);
    };
};




showList();


changeStatus("find all the missing socks");

changeStatus("find all the missing socks", "impossible");

changeStatus("find all the missing socks", "done");


changeStatus("Learn JavaScript for an hour", "done");

changeStatus("Learn JavaScript at least 3 hours", "done");


addTask("eat pizza");

changeStatus("eat pizza", "done");


deleteTask("Reflect on the ephemerality of being");

deleteTask("Reflect on the ephemerality of being");


addTask("Keep hoping for a miracle");

showList();


changeStatus("keep hoping for a miracle", "in progress");

showList();