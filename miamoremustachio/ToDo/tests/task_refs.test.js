const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const PLAN_ID = '65c09742561b3a1051705b49';
const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

const VALID_TASK_REFS = [
  '655449a15812e4abfc786f29',
  '65544d9f5ae1fc8d350a6693',
  '655451b35ae1fc8d350a6695',
];

let lastTaskRef;

beforeAll(async () => {
  await database.connect();
});

describe('task refs', () => {
  test('POST plans/:id/tasks', async () => {
    const response = await request(app)
      .post(`/plans/${PLAN_ID}/tasks`)
      .set(HEADERS)
      .send(VALID_TASK_REFS);
    lastTaskRef = getFinalResourceId(response.text);
    expect(response.status).toBe(200);
  });

  test('GET plans/:id/tasks/:taskId', async () => {
    const response = await request(app)
      .get(`/plans/${PLAN_ID}/tasks/${lastTaskRef}`)
      .set(HEADERS);
    expect(response.status).toBe(200);
    expect(response.body._id).toMatch(lastTaskRef);
  });

  test('DELETE plans/:id/tasks/:taskId', async () => {
    for (const taskRef of VALID_TASK_REFS) {
      const response = await request(app)
        .delete(`/plans/${PLAN_ID}/tasks/${taskRef}`)
        .set(HEADERS);
      expect(response.status).toBe(204);
    }
  });
});

describe('task refs (not found)', () => {
  test('GET /plans/:id/tasks/:taskId', async () => {
    const response = await request(app)
      .get(`/plans/${PLAN_ID}/tasks/${lastTaskRef}`)
      .set(HEADERS);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});