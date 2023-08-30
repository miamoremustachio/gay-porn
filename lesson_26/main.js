'use strict';

const statusList = ['To do', 'In progress', 'Done',];
const priorityList = ['low', 'middle', 'high',];

const toDo = [
    {name: 'Проснуться', status: statusList[0], priority: priorityList[0]},
    {name: 'Умыться', status: statusList[1], priority: priorityList[2]},
];

function addTask(name, status = statusList[0], priority = priorityList[0]) {
    toDo.push({
        name: name,
        status: status,
        priority: priority,
    },)
}

function editTask(taskName, taskStatus, taskPriority) {
    const findTask = toDo.findIndex(task => task.name === taskName);
    toDo[findTask] = {
        name: taskName,
        status: taskStatus,
        priority: taskPriority,
    }
}

function deleteTask(taskName) {
    const deleteIndex = toDo.findIndex(task => task.name === taskName);
    toDo.splice(deleteIndex, 1);
}

function showToDoList() {
    for (let i = 0; i < statusList.length; i++) {
        const currentItem = toDo.filter(task => task.status == statusList[i]);
        console.log(statusList[i])
        currentItem.forEach(task => console.log(`\t${task.name}`));
    }
}

addTask('Почистить зубы');
addTask('Позавтракать');
editTask('Проснуться', 'Done', 'middle');
deleteTask('Умыться');
showToDoList();
