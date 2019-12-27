const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Rule = mongoose.model('Rule');

// POST new rule
router.post('/', auth.required, (req, res, next) => {
  const { body: { rule }} = req;
  
  const finalRule = new Rule(rule);
  return finalRule.save()
    .catch((err) => res.json(err))
    .then(() => res.json({rule: finalRule}));
});

// get all rules
router.get('/', auth.optional, (req, res, next) => {
  Rule.find((err, rules) => {
    if (err) console.error(err);
    res.send(rules);
  })
});

module.exports = router;
