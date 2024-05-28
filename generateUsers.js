const User = require('./Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');
const bcrypt = require('bcrypt');

// Списки імен та прізвищ
const maleNames = ['John', 'Michael', 'William', 'James', 'Robert', 'David', 'Joseph', 'Charles', 'Thomas', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Gary', 'Nicholas', 'Eric', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel', 'Frank', 'Gregory', 'Raymond', 'Alexander'];

const femaleNames = ['Emma', 'Sophia', 'Olivia', 'Isabella', 'Ava', 'Mia', 'Emily', 'Abigail', 'Madison', 'Charlotte', 'Harper', 'Sophia', 'Evelyn', 'Amelia', 'Ella', 'Avery', 'Sofia', 'Aria', 'Chloe', 'Lily', 'Mia', 'Madison', 'Scarlett', 'Victoria', 'Madelyn', 'Eleanor', 'Grace', 'Nora', 'Hannah', 'Addison', 'Zoey', 'Lillian', 'Natalie', 'Brooklyn', 'Savannah', 'Hailey', 'Aurora', 'Audrey', 'Claire', 'Bella', 'Penelope', 'Aaliyah'];

const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker'];

// Функція для генерації випадкового користувача
const generateRandomUser = () => {
    const name = generateRandomName();
    const gender = determineGenderByName(name);
    const surname = generateRandomSurname();
    const email = `${surname.toLowerCase()}.${name.toLowerCase()}@example.com`;
    const password = generateRandomPassword(name, surname);
    return {
        email: email,
        name: name,
        surname: surname,
        password: password,
        date_of_birth: generateRandomDateOfBirth(),
        gender: gender,
        phone_number: generateRandomPhoneNumber()
    };
};

// Функція для визначення статі за ім'ям
const determineGenderByName = (name) => {
    if (maleNames.includes(name)) {
        return 'male';
    } else if (femaleNames.includes(name)) {
        return 'female';
    } else {
        // Якщо ім'я не знайдено в жодному списку, повертаємо 'unknown' або 'neutral'
        return 'unknown';
    }
};

// Функція для генерації випадкового імені
const generateRandomName = () => {
    return getRandomElementFromArray(maleNames.concat(femaleNames));
};

// Функція для генерації випадкового прізвища
const generateRandomSurname = () => {
    return getRandomElementFromArray(surnames);
};

// Функція для генерації випадкового паролю
const generateRandomPassword = (name, surname) => {
    const nameInitial = name.charAt(0).toLowerCase();
    const surnameInitial = surname.charAt(0).toLowerCase();
    return `${nameInitial}${surnameInitial}${Math.floor(Math.random() * 100)}`;
};

// Функція для хешування пароля
const generatePasswordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Функція для отримання випадкового елемента з масиву
const getRandomElementFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Функція для генерації випадкової дати народження
const generateRandomDateOfBirth = () => {
    const start = new Date(1960, 0, 1);
    const end = new Date(2002, 0, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Функція для генерації випадкового номера телефону
const generateRandomPhoneNumber = () => {
    return '+1' + Math.random().toString().slice(2, 12);
};

// Допоміжна функція для генерації випадкового числа в межах від 0 до max (не включаючи саме max)
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

// Функція для створення заданої кількості користувачів
const createUsers = async (count) => {
    try {
        for (let i = 0; i < count; i++) {
            const user = generateRandomUser();
            user.password_hash = await generatePasswordHash(user.password); // Генеруємо хеш пароля та присвоюємо його полю password_hash
            await User.create(user); // Зберігаємо користувача в базу даних
        }
        console.log(`${count} users created successfully!`);
    } catch (error) {
        console.error('Error creating users:', error);
    }
};

createUsers(100);
