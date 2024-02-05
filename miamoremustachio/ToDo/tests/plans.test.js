const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('../modules/helpers/routes-helper.js');

const USER_ID = '6561ff62413e98e914253b1f';
const HEADERS = { Authorization: USER_ID };

const VALID_PLAN = {
  'title': 'escape from Strada',
  'tasks': [
    '655449a15812e4abfc786f29',
    '65544d9f5ae1fc8d350a6693',
    '655451b35ae1fc8d350a6695',
  ],
};

const VALID_FIELDS = {
  'title': 'become a true backender-shmackender',
};

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

afterAll(async () => {
  await database.disconnect();
});