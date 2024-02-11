const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const {
  TASK_ID,
  HEADERS,
  VALID_SUBTASK,
  VALID_FIELDS,
  INVALID_SUBTASK,
} = require('./fixtures/subtask-data.js');

let subtaskId;

beforeAll(async () => {
  await database.connect();
});

describe('subtasks', () => {
  test('POST /tasks/:id/subtasks', async () => {
    const response = await request(app)
      .post(`/tasks/${TASK_ID}/subtasks`)
      .set(HEADERS)
      .send(VALID_SUBTASK);
    subtaskId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set(HEADERS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_SUBTASK.title);
    expect(response.body.completed).toBeFalsy();
  });

  test('PUT /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .put(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set(HEADERS)
      .send(VALID_FIELDS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_FIELDS.title);
    expect(response.body.completed).toBeTruthy();
  });

  test('DELETE /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .delete(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set(HEADERS);
    expect(response.status).toBe(204);
  });

  test('GET /tasks/:id/subtasks', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks`)
      .set(HEADERS);
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
      .set(HEADERS)
      .send(INVALID_SUBTASK);
    expect(response.status).toBe(400);
    console.log(`POST error message: \n${response.text}`);
  });
});

describe('subtasks (not found)', () => {
  test('GET /tasks/:id/subtasks/:subtaskId', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}/subtasks/${subtaskId}`)
      .set(HEADERS);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});