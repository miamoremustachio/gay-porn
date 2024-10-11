const { fixtures } = require('./fixtures');
const { toDo } = require('../app/main');

const validTitles = [ ...fixtures.titles.valid ];
const invalidTitles = [ ...fixtures.titles.invalid ];
const validStatus = fixtures.statuses.valid;
const invalidStatus = fixtures.statuses.invalid;
const validIds = [ ...fixtures.ids.valid ];
const invalidIds = [ ...fixtures.ids.invalid ];

toDo.showTaskList();

toDo.add(validTitles[0]);
const testTask1 = toDo.list.find(task => task.title === validTitles[0]);
console.log(testTask1.title === validTitles[0]); // ✓

toDo.add(validTitles[1], validStatus);
const testTask2 = toDo.list.find(task => task.title === validTitles[1]);
console.log(testTask2.status === validStatus); // ✓

toDo.add(invalidTitles[0], validStatus);
const testTask8 = toDo.list.find(task => task.title === invalidTitles[0]);
console.log(testTask8 === undefined); // ✓

toDo.add(invalidTitles[1], validStatus);
const testTask9 = toDo.list.find(task => task.title === invalidTitles[1]);
console.log(testTask9 === undefined); // ✓

toDo.add(invalidTitles[2], validStatus);
const testTask10 = toDo.list.find(task => task.title === invalidTitles[2]);
console.log(testTask10 === undefined); // ✓

toDo.add(validTitles[2], invalidStatus);
const testTask3 = toDo.list.find(task => task.title === validTitles[2]);
console.log(testTask3 === undefined); // ✓

toDo.showTaskList();