const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const {
  STATUSES,
  PRIORITIES,
} = require('../modules/helpers/constants.js');
const { getDefaultDeadline } = require('../modules/helpers/time-helper.js');
const { getFinalResourceId } = require('../modules/helpers/routes-helper.js');

const TEST_USER_ID = '6561ff62413e98e914253b1f';

const VALID_TASK = {
  'title': 'drink korvalol',
  'priority': PRIORITIES.HIGH,
}

const VALID_FIELDS = {
  'title': 'drink boyaryshnik',
  'priority': PRIORITIES.LOW,
  'status': STATUSES.DONE,
  'deadline': getDefaultDeadline(),
}

const INVALID_TASK = {
  'title': 'aa',
  'priority': 'foo',
  'status': 'bar',
  'deadline': '',
}

let taskId;

beforeAll(async () => {
  await database.connect();
})

describe('tasks', () => {
  test('POST /tasks', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', TEST_USER_ID)
      .send(VALID_TASK);
    taskId = getFinalResourceId(response.text);
    expect(response.status).toEqual(201);
  });

  test('GET /tasks/:id', async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', TEST_USER_ID);
    expect(response.status).toEqual(200);
    expect(response.body.title).toMatch(VALID_TASK.title);
    expect(response.body.priority).toMatch(VALID_TASK.priority);
    expect(response.body.user._id).toMatch(TEST_USER_ID);
  });

  test('PUT /tasks/:id', async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', TEST_USER_ID)
      .send(VALID_FIELDS);
    expect(response.status).toEqual(200);
    expect(response.body.title).toMatch(VALID_FIELDS.title);
    expect(response.body.status).toMatch(VALID_FIELDS.status);
    expect(response.body.priority).toMatch(VALID_FIELDS.priority);
    expect(response.body.deadline).toBe(VALID_FIELDS.deadline.toISOString());
  });

  test('DELETE /tasks/:id', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', TEST_USER_ID);
    expect(response.status).toEqual(204);
  });

  test('GET /tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .set('Authorization', TEST_USER_ID);
    expect(response.status).toEqual(200);
    for (const task of response.body) {
      expect(task._id).not.toMatch(taskId);
    };
  });
});

describe('tasks (invalid)', () => {
  test('POST /tasks', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', TEST_USER_ID)
      .send(INVALID_TASK);
    expect(response.status).toEqual(400);
    console.log(`POST error message: \n${response.text}`);
  });
});

describe('tasks (not found)', () => {
  test('GET /tasks', async () => {
    const response = await request(app)
      .get(`/tasks${taskId}`)
      .set('Authorization', TEST_USER_ID);
    expect(response.status).toEqual(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});