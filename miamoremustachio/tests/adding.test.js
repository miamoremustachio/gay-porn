const { fixtures } = require('./fixtures');
const { toDo } = require('../app/main');

const validTitles = [ ...fixtures.titles.valid ];
const invalidTitles = [ ...fixtures.titles.invalid ];
const validStatus = fixtures.statuses.valid;
const invalidStatus = fixtures.statuses.invalid;
const validIds = [ ...fixtures.ids.valid ];
const invalidIds = [ ...fixtures.ids.invalid ];

test('valid title, no status', () => {
  try {
    toDo.add(validTitles[0]);
  
  } catch(err) {
    console.error(err.message);
  }
  
  const task = toDo.list.find(task => task.title === validTitles[0]);
  
  expect(task.title).toBe(validTitles[0]);
});

test('valid title, valid status', () => {
  try {
    toDo.add(validTitles[1], validStatus);

  } catch(err) {
    console.error(err.message);
  }
    
  const task = toDo.list.find(task => task.title === validTitles[1]);
  
  expect(task.status).toBe(validStatus);
});

test('invalid title', () => {
  try {
    toDo.add(invalidTitles[0]);

  } catch(err) {
    console.error(err.message);
  }

  const task = toDo.list.find(task => task.title === invalidTitles[0]);
  
  expect(task).toBeUndefined();
});

test('invalid status', () => {
  try {
    toDo.add(validTitles[2], invalidStatus);

  } catch(err) {
    console.error(err.message);
  }

  const task = toDo.list.find(task => task.title === validTitles[2]);
  
  expect(task).toBeUndefined();
});