const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');

const TASK_ID = '65633d765d1d06dcad8ff7d0';

beforeAll(async () => {
  await database.connect();
});

describe('authorization', () => {
  test('unauthorized user request', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}`);
    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await database.disconnect();
});