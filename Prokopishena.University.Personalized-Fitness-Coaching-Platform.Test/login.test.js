const request = require('supertest');
const app = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web/server');
const { createTestUser } = require('./testUtils');

describe('GET /user/:user_id', () => {
  it('should return user details for valid user ID', async () => {
    const testUser = createTestUser();
    console.log('Test User:', testUser); // Виведення інформації про тестового користувача

    // Створення тестового користувача в базі даних перед входом
    // В реальному випадку вам потрібно буде написати код для додавання цього користувача у базу даних, наприклад, використовуючи sequelize

    // Вхід з використанням даних тестового користувача
    const loginResponse = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });

    // Перевіряємо, чи вдалося ввійти
    expect(loginResponse.status).toBe(200);

    // Отримуємо user_id з відповіді на вхід
    const user_id = loginResponse.body.user_id;

    // Тепер отримуємо дані користувача за user_id
    const response = await request(app).get(`/user/${user_id}`);

    // Перевірка статусу та вмісту відповіді
    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe(user_id); // Перевірка відповідного ID користувача
    expect(response.body.name).toBe(testUser.name); // Перевірка імені користувача
    // Додаткові перевірки для інших властивостей користувача
  });

  it('should return 404 for invalid user ID', async () => {
    const response = await request(app).get('/user/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User with this ID not found');
  });

  // Додайте інші тести тут для перевірки різних сценаріїв
});

describe('POST /update-user', () => {
    it('should update user data based on login information', async () => {
      const testUser = createTestUser();
      // Вхід з використанням даних тестового користувача
      const loginResponse = await request(app)
        .post('/login')
        .send({ email: testUser.email, password: testUser.password });
  
      // Перевіряємо, чи вдалося ввійти
      expect(loginResponse.status).toBe(200);
  
      // Отримуємо user_id з відповіді на вхід
      const user_id = loginResponse.body.user_id;
  
      // Відправляємо запит на оновлення даних користувача
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
  
      // Перевіряємо статус та вміст відповіді
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.text).toBe('User data updated successfully');
      
      // Після оновлення перевіряємо, чи дані користувача змінилися
      const updatedUserResponse = await request(app).get(`/user/${user_id}`);
      expect(updatedUserResponse.status).toBe(200);
      expect(updatedUserResponse.body.name).toBe('New Name');
      expect(updatedUserResponse.body.surname).toBe('New Surname');
      expect(updatedUserResponse.body.email).toBe('newemail@example.com');
      expect(updatedUserResponse.body.date_of_birth).toBe('1995-01-01');
      expect(updatedUserResponse.body.phone_number).toBe('+380123456789');
      expect(updatedUserResponse.body.gender).toBe('female');
    });
  
    // Додайте інші тести тут для перевірки різних сценаріїв оновлення даних користувача
  });
  