const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

const User = mongoose.model('User');

// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]',
// }, (email, password, done) => {
//   User.findOne({ email })
//     .then((user) => {
//       if(!user || !user.validatePassword(password)) {
//         return done(null, false, { errors: { 'email or password': 'is invalid' } });
//       }
// 
//       return done(null, user);
//     }).catch(done);
// }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/api/user/google/callback'
  },
  
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id, 
      email: profile.emails[0].value,
      token: accessToken,
    }, (err, user) => {
      return done(err, user);
    });
  }
));
