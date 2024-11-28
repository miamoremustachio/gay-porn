const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const {
  USER_ID,
  HEADERS,
  ValidTask,
  ValidTaskFields,
  InvalidTask,
} = require('./fixtures/task-data.js');

let taskId;
const task = new ValidTask();
const taskFields = new ValidTaskFields();

beforeAll(async () => {
  await database.connect();
});

describe('tasks', () => {
  test('POST /tasks', async () => {
    const response = await request(app)
      .post('/tasks')
      .set(HEADERS)
      .send(task);
    taskId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /tasks/:id', async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set(HEADERS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(task.title);
    expect(response.body.priority).toMatch(task.priority);
    expect(response.body.user._id).toMatch(USER_ID);
  });

  test('PUT /tasks/:id', async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .set(HEADERS)
      .send(taskFields);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(taskFields.title);
    expect(response.body.status).toMatch(taskFields.status);
    expect(response.body.priority).toMatch(taskFields.priority);
    expect(response.body.deadline).toBe(taskFields.deadline.toISOString());
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
      .send(new InvalidTask());
    expect(response.status).toBe(400);
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