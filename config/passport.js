const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  // console.log('serializeUser\n', user, '\n');
  done(null, user.id); // this id parameter grabs the oauth id from the oauth provider
});

passport.deserializeUser(function(id, done) {
  User.findOne({ googleId: id }).then((user) => { // deserialize using the oauth id
    // console.log('deserializeUser\n', user, '\n');
    done(null, user);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: '/api/user/google/callback',
  },
  
  (accessToken, refreshToken, profile, done) => {
    // console.log('google strategy', profile);
    
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          // console.log('existing user!', existingUser)
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
