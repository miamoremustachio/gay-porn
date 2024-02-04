const request = require('supertest');
const mongoose = require('mongoose');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');

const TASK_ID = '65633d765d1d06dcad8ff7d0';
const RANDOM_ID = new mongoose.Types.ObjectId().toString();

beforeAll(async () => {
  await database.connect();
});

describe('client errors', () => {
  test('not found', async () => {
    const response = await request(app)
      .get(`/tasks/${RANDOM_ID}`);
    expect(response.status).toBe(404);
  });

  test('unauthorized', async () => {
    const response = await request(app)
      .get(`/tasks/${TASK_ID}`);
    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await database.disconnect();
});