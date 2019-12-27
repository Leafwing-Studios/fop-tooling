const mongoose = require('mongoose');
// const passport = require('passport');
const router = require('express').Router();
// const auth = require('../auth');
const Rule = mongoose.model('Rule');

// POST new rule
router.post('/', (req, res, next) => {
  const { body: { rule }} = req;
  
  // TODO make a util function for this
  if (!rule.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      }
    });
  }
  
  if (!rule.descShort) {
    return res.status(422).json({
      errors: {
        descShort: 'is required',
      }
    });
  }
  
  const finalRule = new Rule(rule);
  return finalRule.save()
    .then(() => res.json({rule: finalRule}));
  
});

// get all rules
router.get('/', (req, res, next) => {
  Rule.find((err, rules) => {
    if (err) console.error(err);
    res.send(rules);
  })
});
