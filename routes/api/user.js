const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const User = mongoose.model('User');

router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback', 
  passport.authenticate('google', {
     failureRedirect: '/login',
     successRedirect: '/',
  }),
);

router.get('/current', (req, res) => {
  res.send(req.user);
});

module.exports = router;
