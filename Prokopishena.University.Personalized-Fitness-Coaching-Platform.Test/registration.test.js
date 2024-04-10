const request = require('supertest');
const app = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web/server');
const { createTestUser } = require('./testUtils');

const server = app.listen();

describe('Registration API Endpoint', () => {
  it('should register a new user', async () => {
    const testUser = createTestUser();
    const res = await request(app)
      .post('/register')
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User successfully registered');
  });
});

afterAll((done) => {
    server.close(done);
});
