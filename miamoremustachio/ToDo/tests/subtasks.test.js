const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const TASK_ID = '65633d765d1d06dcad8ff7d0';
const USER_ID = '6561ff62413e98e914253b1f';

const VALID_SUBTASK = {
  'title': 'drink korvalol',
  'completed': false,
};

const VALID_FIELDS = {
  'title': 'drink boyaryshnik',
  'completed': true,
};

const INVALID_SUBTASK = {
  'title': 'aa',
};

let subtaskId;

beforeAll(async () => {
  await database.connect();
});

describe('subtasks', () => {
  test('POST /tasks/:id/subtasks', async () => {
    const response = await request(app)
      .post(`/tasks/${TASK_ID}/subtasks`)
      .set('Authorization', USER_ID)
      .send(VALID_SUBTASK);
    subtaskId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set('Authorization', USER_ID);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_SUBTASK.title);
    expect(response.body.completed).toBeFalsy();
  });

  test('PUT /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .put(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set('Authorization', USER_ID)
      .send(VALID_FIELDS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_FIELDS.title);
    expect(response.body.completed).toBeTruthy();
  });

  test('DELETE /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .delete(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set('Authorization', USER_ID);
    expect(response.status).toBe(204);
  });

  test('GET /tasks/:id/subtasks', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks`)
      .set('Authorization', USER_ID);
    expect(response.status).toBe(200);
    for (const subtask of response.body) {
      expect(subtask._id).not.toMatch(subtaskId);
    }
  });
});

describe('subtasks (invalid)', () => {
  test('POST /tasks/:id/subtasks', async () => {
    const response = await request(app)
      .post(`/tasks/${TASK_ID}/subtasks`)
      .set('Authorization', USER_ID)
      .send(INVALID_SUBTASK);
    expect(response.status).toBe(400);
    console.log(`POST error message: \n${response.text}`);
  });
});

describe('subtasks (not found)', () => {
  test('GET /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set('Authorization', USER_ID);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});