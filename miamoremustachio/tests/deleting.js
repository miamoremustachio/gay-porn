const { fixtures } = require('./fixtures');
const { toDo } = require('../app/main');

const validTitles = [ ...fixtures.titles.valid ];
const invalidTitles = [ ...fixtures.titles.invalid ];
const validStatus = fixtures.statuses.valid;
const invalidStatus = fixtures.statuses.invalid;
const validIds = [ ...fixtures.ids.valid ];
const invalidIds = [ ...fixtures.ids.invalid ];

toDo.showTaskList();

toDo.deleteByTitle(validTitles[0]);
const testTask4 = toDo.list.find(task => task.title === validTitles[0]);
console.log(testTask4 === undefined); // ✓

toDo.deleteByTitle(validTitles[2]);
const testTask5 = toDo.list.find(task => task.title === validTitles[2]);
console.log(testTask5 === undefined); // ✓

toDo.deleteById(validIds[0]);
const testTask6 = toDo.list.find(task => task.id === validIds[0]);
console.log(testTask6 === undefined); // ✓

toDo.deleteById(invalidIds[1]);
const testTask7 = toDo.list.find(task => task.id === validIds[1]);
console.log(Boolean(testTask7)); // ✓

toDo.showTaskList();