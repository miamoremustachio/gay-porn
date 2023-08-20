const STATUSES = {
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    TO_DO: 'To Do'
}

const list = {
    'create a new practice task': STATUSES.TO_DO,
    'make a bed': STATUSES.IN_PROGRESS,
    'write a post': STATUSES.DONE,
}

const ERRORS = {
    NO_SUCH_TASK_NAME: 'No such task name in list',
    NO_SUCH_STATUS: 'No such status in statuses'
}

const checkStatuses = (status) => {
    for (const stat in STATUSES) {
        if (status === STATUSES[stat]) {
            return true
        }
    }
}

const addTask = (taskName) => {
    if (taskName in list) {
        console.log('This task is already in list')
    } else {
        list[taskName] = STATUSES.TO_DO
    }
}

const deleteTask = (taskName) => {
    if (taskName in list) {
        delete list[taskName]
    } else {
        console.log(ERRORS.NO_SUCH_TASK_NAME)
    }
}

const changeStatus = (taskName, status) => {
    if (!(taskName in list)) {
        console.log('Change Status ERROR : ' + ERRORS.NO_SUCH_TASK_NAME)
        return;
    }

    const isStatusInList = checkStatuses(status)
    if (isStatusInList) {
        console.log('Status changed : ' + taskName)
    } else {
        console.log('Change Status ERROR : ' + ERRORS.NO_SUCH_STATUS)
    }
}

const showList = () => {
    console.log('\n' + 'Task List:')

    let ToDoTasks = ''
    let InProgressTasks = ''
    let DoneTasks = ''

    for (const taskName in list) {
        if (list[taskName] === STATUSES.TO_DO) {
            ToDoTasks += `${taskName} : ${list[taskName]} \n`
        } else if (list[taskName] === STATUSES.IN_PROGRESS) {
            InProgressTasks += `${taskName} : ${list[taskName]} \n`
        } else if (list[taskName] === STATUSES.DONE) {
            DoneTasks += `${taskName} : ${list[taskName]} \n`
        } else {
            console.log(ERRORS.NO_SUCH_STATUS)
        }
    }

    if (ToDoTasks) {
        console.log('\n' + ToDoTasks)
    } else {
        console.log('\n' + 'Nothing To Do')
    }

    if (InProgressTasks) {
        console.log('\n' + InProgressTasks)
    } else {
        console.log('\n' + 'Nothing is In Progress')
    }

    if (DoneTasks) {
        console.log('\n' + DoneTasks)
    } else {
        console.log('\n' + 'Nothing is Done')
    }
}

const showListBonus = () => {

    console.log('\n' + 'Task List:');
    console.log('------------------------' + '\n')
    console.log('To Do:');

    let ToDoTasks = ''
    let InProgressTasks = ''
    let DoneTasks = ''


    for (const taskName in list) {
        if (list[taskName] === STATUSES.TO_DO) {
            ToDoTasks += `   -${taskName} \n`
        }
    }

    if (ToDoTasks) {
        console.log(ToDoTasks)
    } else {
        console.log('   -Nothing To Do-')
    }

    console.log('\n' + 'In Progress:')

    for (const taskName in list) {
        if (list[taskName] === STATUSES.IN_PROGRESS) {
            InProgressTasks += `   -${taskName} \n`
        }
    }

    if (InProgressTasks) {
        console.log(InProgressTasks)
    } else {
        console.log('   -Nothing is In Progress-')
    }

    console.log('\n' + 'Done:')

    for (const taskName in list) {
        if (list[taskName] === STATUSES.DONE) {
            DoneTasks += `   -${taskName} \n`
        }
    }

    if (DoneTasks) {
        console.log(DoneTasks)
    } else {
        console.log('   -Nothing is Done-')
    }
}


addTask('take a shower')
addTask('Do breakfast')
addTask('Go for a walk')
addTask('Wash dishes')
addTask('take a shower')
deleteTask('make a bed')
deleteTask('create a new practice task')
changeStatus('take a shower', STATUSES.DONE)
changeStatus('make a bed', STATUSES.IN_PROGRESS)
changeStatus('Do breakfast', STATUSES.DONE)
changeStatus('Go for a walk', STATUSES.IN_PROGRESS)
showList()
showListBonus()
