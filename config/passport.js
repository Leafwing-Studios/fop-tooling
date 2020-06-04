const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/api/user/google/callback',
  },
  
  (accessToken, refreshToken, profile, done) => {
    // console.log("Strategy");
    // console.log(profile);
    // console.log(accessToken);
    // console.log(refreshToken);
    
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          console.log('existing user!');
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
      
    done(null, profile);  
  }
));
