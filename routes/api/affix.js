const mongoose = require('mongoose');
const router = require('express').Router();
// const passport = require('passport');
const auth = require('../auth');
const Affix = mongoose.model('Affix');

// POST new affix
router.post('/', auth.required, (req, res, next) => {
  const { body: { affix }} = req;
  
  const finalAffix = new Affix(affix);
  return finalAffix.save()
    .catch((err) => res.json(err)) // catches validation errors from the databse, and others
    .then(() => res.json({affix: finalAffix}));
});

// get all affixes
router.get('/', auth.optional, (req, res, next) => {
  Affix.find((err, affixes) => {
    if (err) console.error(err);
    res.send(affixes);
  })
});

module.exports = router;
