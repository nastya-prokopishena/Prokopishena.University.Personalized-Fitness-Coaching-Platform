const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web/server'); // Припустимо, що ваша програма розташована в файлі app.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Registration', () => {
    it('should register a new user', async () => {
        const userData = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            date_of_birth: '1990-01-01',
            gender: 'male',
            phone_number: '1234567890'
        };

        const res = await chai.request(app)
            .post('/register')
            .send(userData);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equals('Account created successfully!');
    });
});

describe('User Login', () => {
    it('should login an existing user', async () => {
        const userData = {
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const res = await chai.request(app)
            .post('/login')
            .send(userData);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user_id');
    });
});
