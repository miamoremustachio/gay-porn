const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const {
  USER_ID,
  HEADERS,
  VALID_PLAN,
  VALID_FIELDS,
} = require('./fixtures/plan-data.js');

let planId;

beforeAll(async () => {
  await database.connect();
});

describe('plans', () => {
  test('POST /plans', async () => {
    const response = await request(app)
      .post('/plans')
      .set(HEADERS)
      .send(VALID_PLAN);
    planId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /plans/:id', async () => {
    const response = await request(app)
      .get(`/plans/${planId}`)
      .set(HEADERS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_PLAN.title);
    expect(response.body.user._id).toMatch(USER_ID);
    for (const task of response.body.tasks) {
      expect(VALID_PLAN.tasks).toContain(task._id);
    }
  });

  test('PUT /plans/:id', async () => {
    const response = await request(app)
      .put(`/plans/${planId}`)
      .set(HEADERS)
      .send(VALID_FIELDS);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch(VALID_FIELDS.title);
  });

  test('DELETE /plans/:id', async () => {
    const response = await request(app)
      .delete(`/plans/${planId}`)
      .set(HEADERS);
    expect(response.status).toBe(204);
  });

  test('GET /plans', async () => {
    const response = await request(app)
      .get('/plans')
      .set(HEADERS);
    expect(response.status).toBe(200);
    for (const plan of response.body) {
      expect(plan._id).not.toMatch(planId);
    }
  });
});

describe('plans (not found)', () => {
  test('GET /plans/:id', async () => {
    const response = await request(app)
      .get(`/plans/${planId}`)
      .set(HEADERS);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});