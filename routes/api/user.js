const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const User = mongoose.model('User');

// login route for oauth with google
router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// google oauth callback. this gets hit after the user logs in with google
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req, res) => {
    res.redirect('/'); // we do the redirect here in a call back because the successRedirect parameter was causing weird header issues
  }
);

// get the current user. this takes advantage of the session cookie, passport's deserializeUser function, and the passport.session() middleware
router.get('/current', (req, res) => {
  res.send(req.user);
});

// logs out the current user. more passport stuff.
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
