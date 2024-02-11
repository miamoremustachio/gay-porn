const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');

const {
  TASK_ID,
  RANDOM_ID,
} = require('./fixtures/authorization-data.js');

beforeAll(async () => {
  await database.connect();
});

describe('authorization errors', () => {
  test('unauthorized', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}`);
    expect(response.status).toBe(401);
  });

  test('forbidden', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}`)
      .set('Authorization', RANDOM_ID);
    expect(response.status).toBe(403);
  });
});

afterAll(async () => {
  await database.disconnect();
});