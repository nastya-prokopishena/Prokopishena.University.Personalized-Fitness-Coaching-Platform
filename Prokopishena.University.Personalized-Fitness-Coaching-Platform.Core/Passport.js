// Core/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');
const Password = require('../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/Password');

// Google стратегія
passport.use(new GoogleStrategy({
    clientID: '253407104138-k72rjur1ca4895cftko022sghtmo7q8r.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ where: { googleId: profile.id } });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value
        });
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
));

// Локальна стратегія для аутентифікації через email та пароль
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Неправильний email або пароль' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Серіалізація та десеріалізація користувача
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
