const request = require('supertest');
const app = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web/server');
const { createTestUser } = require('./testUtils');

describe('GET /user/:user_id', () => {
  it('should return user details for valid user ID', async () => {
    const testUser = createTestUser();
    console.log('Test User:', testUser); 

    const loginResponse = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(loginResponse.status).toBe(200);

    const user_id = loginResponse.body.user_id;

    const response = await request(app).get(`/user/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe(user_id); 
    expect(response.body.name).toBe(testUser.name); 

  });

  it('should return 404 for invalid user ID', async () => {
    const response = await request(app).get('/user/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User with this ID not found');
  });

});

describe('POST /update-user', () => {
    it('should update user data based on login information', async () => {
      const testUser = createTestUser();
      const loginResponse = await request(app)
        .post('/login')
        .send({ email: testUser.email, password: testUser.password });
  
      expect(loginResponse.status).toBe(200);
  
      const user_id = loginResponse.body.user_id;
  
      const updateResponse = await request(app)
        .post('/update-user')
        .send({
          userId: user_id,
          newName: 'New Name',
          newSurname: 'New Surname',
          newEmail: 'newemail@example.com',
          newBirthdate: '1995-01-01',
          newPhoneNumber: '+380123456789',
          newGender: 'female'
        });
  
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.text).toBe('User data updated successfully');
      
      const updatedUserResponse = await request(app).get(`/user/${user_id}`);
      expect(updatedUserResponse.status).toBe(200);
      expect(updatedUserResponse.body.name).toBe('New Name');
      expect(updatedUserResponse.body.surname).toBe('New Surname');
      expect(updatedUserResponse.body.email).toBe('newemail@example.com');
      expect(updatedUserResponse.body.date_of_birth).toBe('1995-01-01');
      expect(updatedUserResponse.body.phone_number).toBe('+380123456789');
      expect(updatedUserResponse.body.gender).toBe('female');
    });
  
  });
  