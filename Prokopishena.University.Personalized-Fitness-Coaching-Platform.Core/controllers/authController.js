const passport = require('passport');
const User = require('../../Prokopishena.University.Personalized-Fitness-Coaching-Platform.Models/User');

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    const newUser = await User.create({ email, password, firstName, lastName, username });
    res.redirect('/login');
  } catch (error) {
    next(error);
  }
};

exports.loginUser = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};
