const request = require('supertest');
const app = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web/server');
const { createTestUser } = require('./testUtils');

describe('Create Client API Endpoint', () => {
    it('should create a new client', async () => {
      const testUser = createTestUser();
      const res = await request(app)
        .post('/create-client')
        .send({ user_id: 'testUserId' }); // assuming you have a valid user_id
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('client');
    });
  });

describe('Create Trainer API Endpoint', () => {
  it('should create a new trainer', async () => {
    const testUser = createTestUser();
    const res = await request(app)
      .post('/create-trainer')
      .send({ user_id: 'testUserId' }); // assuming you have a valid user_id
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('trainer');
  });
});

afterAll((done) => {
  app.close(done);
});