//shove the wacky namespace in object-schmobject:
const STATUS = {
    TODO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

//another snappy nameshpace for error messamges:
const ERROR = {
    TASK_EXIST: "The task you want to add is already exist.\nYou can change its status by using the 'changeStatus' method",
    INVALID_STATUS: "Invalid status format: only 'to do', 'in progress' and 'done' are allowed.",
};


function returnError(error) {
    switch (error) {
        case ERROR.TASK_EXIST:
            return console.error(ERROR.TASK_EXIST);
        case ERROR.INVALID_STATUS:
            return console.error(ERROR.INVALID_STATUS);
        // continue later...
    };
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
    add(task, status) {
        if (task in this.list) {
            returnError(ERROR.TASK_EXIST);
        } else if (status != STATUS.TODO
                && status != STATUS.IN_PROGRESS
                && status != STATUS.DONE) {
            returnError(ERROR.INVALID_STATUS);
        } else {
            this.list[task] = status;
        };
    },
};

// testing:
console.log(toDo.list);
toDo.add('to foose the foo', 'to do');       // added successfully
toDo.add('to bare the bar', 'todo');        // error
toDo.add('accept the inevitable', 'done'); // error!
console.log(toDo.list);