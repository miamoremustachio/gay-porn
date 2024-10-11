//shove the wacky namespace in object-schmobject:
const STATUS = {
    TODO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

//another snappy nameshpace for error messamges:
const ERROR = {
    TASK_EXIST: "The task you want to add is already exist;\nYou can change its status by using the 'changeStatus' method.",
    TASK_NOT_FOUND: "The task you're looking for wasn't found in list. Check the correctness of spelling and try again.",
    INVALID_STATUS: "Invalid status format: only 'to do', 'in progress' and 'done' are allowed.",
};


function returnError(error) {
    switch (error) {
        case ERROR.TASK_EXIST:
            return console.error(ERROR.TASK_EXIST);
        case ERROR.TASK_NOT_FOUND:
            return console.error(ERROR.TASK_NOT_FOUND);
        case ERROR.INVALID_STATUS:
            return console.error(ERROR.INVALID_STATUS);
    };
}

function findInvalid(status) {
    if (status != STATUS.TODO
     && status != STATUS.IN_PROGRESS
     && status != STATUS.DONE)
        { return true };
}

function showTasksBy(status) {
    let statusExist;

    for (const task in toDo.list) {
        if (status === toDo.list[task]) { 
            console.log('\t' + task);
            statusExist = true;
        };
    };

    if (!statusExist) { console.log('\t-'); };
}


const toDo = {
    list: {
        'decide to become a backend developer': STATUS.DONE,
        'search Node.JS developer vacancies': STATUS.DONE,
        'regret your decision at least 256 times': STATUS.DONE,
        // I don't know what's the point of starting ToDo list with half of tasks already done, but whatever
        'drink valeriana tincture': STATUS.IN_PROGRESS,
        'seek help from the pantheon of Greek gods': STATUS.IN_PROGRESS,
        'accept the inevitable': STATUS.IN_PROGRESS,
    },
    add(task) {
        if (task in this.list) {
            returnError(ERROR.TASK_EXIST);
        } else {
            this.list[task] = STATUS.TODO;
        };
    },
    change(task, status) {
        if (!(task in this.list)) {
            returnError(ERROR.TASK_NOT_FOUND);
        } else if (findInvalid(status)) {
            returnError(ERROR.INVALID_STATUS);
        } else {
            this.list[task] = status;
        };
    },
    delete(task) {
        if (!(task in this.list)) {
            returnError(ERROR.TASK_NOT_FOUND);
        } else {
            delete this.list[task];
        };
    },
    showAll() {
        console.log('To do:');
            showTasksBy(STATUS.TODO);
        console.log('In progress:');
            showTasksBy(STATUS.IN_PROGRESS);
        console.log('Done:');
            showTasksBy(STATUS.DONE);
    }
};

// testing:
toDo.add('just keep going like a real stoic chad'); // most of Greek gods would definitely approve it.
toDo.add('accept the inevitable'); // [error]
toDo.change('drink valeriana tincture', 'done'); // status changed successfully!
toDo.change('seek help from the pantheon of Greek gods', "but I don't speak ancient Greek!"); // [error]
toDo.change('*fictional task*', 'done'); // [error]
toDo.delete('regret your decision at least 256 times'); // that's too specific.
toDo.delete('discuss the problem with your cat'); // [error]
toDo.showAll(); // admire the result.