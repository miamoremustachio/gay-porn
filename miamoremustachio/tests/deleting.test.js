const { fixtures } = require('./fixtures');
const { toDo } = require('../app/main');

const validTitles = [ ...fixtures.titles.valid ];
const invalidTitles = [ ...fixtures.titles.invalid ];
const validStatus = fixtures.statuses.valid;
const invalidStatus = fixtures.statuses.invalid;
const validIds = [ ...fixtures.ids.valid ];
const invalidIds = [ ...fixtures.ids.invalid ];

for (let title of validTitles) {
  toDo.add(title);
}

test('valid title', () => {
  try {
    toDo.deleteByTitle(validTitles[0]);
  
  } catch(err) {
    console.error(err.message);
  }
  
  const task = toDo.list.find(task => task.title === validTitles[0]);
  
  expect(task).toBeUndefined();
});

test('valid id', () => {
  try {
    toDo.deleteById(validIds[0]);

  } catch(err) {
    console.error(err.message);
  }

  const task = toDo.list.find(task => task.id === validIds[0]);
  
  expect(task).toBeUndefined();
});

test('invalid id', () => {
  try {
    toDo.deleteById(invalidIds[1]);

  } catch(err) {
    console.error(err.message);
  }

  const task = toDo.list.find(task => task.id === validIds[1]);
  
  expect(task).toBeDefined();
});