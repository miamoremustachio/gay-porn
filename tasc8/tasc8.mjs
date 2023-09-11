import data from './tascs.json' assert {type: "json"};

const STATUS = {
    DONE: 'Выполнено',
    TODO: 'Запланировано',
    INPROGRESS: 'Выполняется'
}; // коллекция статусов

const PRIORITY = {
    LOW: 'Низкий',
    MEDIUM: 'Средний',
    HIGH: 'Высокий'
}; // коллекция приоритетов

// const name = 'Цель: ';
// const status = 'Статус: ';
// const priority = 'Важность: ';

const targetList = [];

const addTarget = (targetName, targetStatus, priority) => {
    targetList.push({targetName, targetStatus, priority})
    if (targetName.length < 3) {
        throw new Error("Ошибка! Слишком короткое название цели");
    }
    if (targetName.length > 30) {
        throw new Error("Фатальная ошибка! Слишком длинное название цели")
    }
}

// try {
    const deleteTarget = () => {
    targetList.pop()
} 
// } catch {
//     if (targetStatus === INPROGRESS) {
//         throw new Error("Фатальная ошибка! Задача выполняется - удаление невозможно")
//     };
// }

const changeTarget = (targetName, targetStatus, priority) => {
    targetList[targetList.length-1] = {targetName, targetStatus, priority};
};

const showTargetList = () => {
    for (const target of targetList)
    console.log(target);
}

addTarget('Relocate to Königsberg', STATUS.INPROGRESS, PRIORITY.HIGH);

addTarget('Change engine oil', STATUS.TODO, PRIORITY.HIGH);

addTarget('Start Backend roadmap', STATUS.DONE, PRIORITY.HIGH);

addTarget('Sell a car', STATUS.INPROGRESS, PRIORITY.HIGH);

deleteTarget();

changeTarget('Make a bed', STATUS.TODO, PRIORITY.LOW);

showTargetList();

console.log(data);