const request = require('supertest');

const { app } = require('../app.js');
const { database } = require('../modules/database/connection.js');
const { getFinalResourceId } = require('./fixtures/test-utils.js');

const {
  defaultRoles,
  ValidUser,
  ValidUserFields,
  InvalidUser,
} = require('./fixtures/user-data.js');

let userId;
const user = new ValidUser();
const userFields = new ValidUserFields();

beforeAll(async () => {
  await database.connect();
});

describe('users', () => {
  test('POST /users', async () => {
    const response = await request(app)
      .post('/users')
      .send(user);
    userId = getFinalResourceId(response.text);
    expect(response.status).toBe(201);
  });

  test('GET /users/:id', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set({ Authorization: userId });
    expect(response.status).toBe(200);
    expect(response.body.username).toMatch(user.username);
    expect(response.body.age).toBe(user.age);
    expect(response.body.gender).toMatch(user.gender);
    expect(response.body.email).toMatch(user.email);
    expect(response.body.roles).toEqual(defaultRoles);
    expect(response.body._id).toMatch(userId);
  });

  test('PUT /users/:id', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set({ Authorization: userId })
      .send(userFields);
    expect(response.status).toBe(200);
    expect(response.body.username).toMatch(userFields.username);
    expect(response.body.age).toBe(userFields.age);
    expect(response.body.gender).toMatch(userFields.gender);
    expect(response.body.email).toMatch(userFields.email);
    expect(response.body.roles).toEqual(userFields.roles);
  });

  test('DELETE /users/:id', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set({ Authorization: userId });
    expect(response.status).toBe(204);
  });

  test('GET /users', async () => {
    const response = await request(app)
      .get('/users');
    expect(response.status).toBe(200);
    for (const user of response.body) {
      expect(user._id).not.toMatch(userId);
    }
  })
});

describe('users (invalid', () => {
  test('POST /users', async () => {
    const response = await request(app)
      .post('/users')
      .send(new InvalidUser());
    expect(response.status).toBe(400);
  });
});

describe('users (not found)', () => {
  test('GET /users/:id', async () => {
    const response = await request(app)
      .get(`/users/${userId}`);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await database.disconnect();
});