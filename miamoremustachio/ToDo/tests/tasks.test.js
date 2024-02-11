const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const {
  USER_ID,
  HEADERS,
  VALID_TASK,
  VALID_FIELDS,
  INVALID_TASK,
} = require('./fixtures/task-data.js');

let taskId;

beforeAll(async () => {
  await database.connect();
});

describe('tasks', () => {
  test('POST /tasks', async () => {
    const response = await request(app)
      .post('/tasks')
      .set(HEADERS)
      .send(VALID_TASK);
    taskId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /tasks/:id', async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set(HEADERS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_TASK.title);
    expect(response.body.priority).toMatch(VALID_TASK.priority);
    expect(response.body.user._id).toMatch(USER_ID);
  });

  test('PUT /tasks/:id', async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set(HEADERS)
      .send(VALID_FIELDS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_FIELDS.title);
    expect(response.body.status).toMatch(VALID_FIELDS.status);
    expect(response.body.priority).toMatch(VALID_FIELDS.priority);
    expect(response.body.deadline).toBe(VALID_FIELDS.deadline.toISOString());
  });

  test('DELETE /tasks/:id', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set(HEADERS);
    expect(response.status).toBe(204);
  });

  test('GET /tasks', async () => {
    const response = await request(app)
      .get('/tasks')
      .set(HEADERS);
    expect(response.status).toBe(200);
    for (const task of response.body) {
      expect(task._id).not.toMatch(taskId);
    }
  });
});

describe('tasks (invalid)', () => {
  test('POST /tasks', async () => {
    const response = await request(app)
      .post('/tasks')
      .set(HEADERS)
      .send(INVALID_TASK);
    expect(response.status).toBe(400);
    console.log(`POST error message: \n${response.text}`);
  });
});

describe('tasks (not found)', () => {
  test('GET /tasks', async () => {
    const response = await request(app)
      .get(`/tasks${taskId}`)
      .set(HEADERS);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});