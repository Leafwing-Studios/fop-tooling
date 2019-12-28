const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Rule = mongoose.model('Rule');

// POST new rule
router.post('/', auth.required, (req, res, next) => {
  const rule = req.body;
  const finalRule = new Rule(rule);
  
  return finalRule.save()
    .catch((err) => res.json(err))
    .then(() => res.json({rule: finalRule}));
});

// update rule
router.post('/:id', auth.required, (req, res) => {
  const rule = req.body;
  const options = {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  };
  
  Rule.findByIdAndUpdate(req.params.id, rule, options, (err, rule) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(rule);
  });
});

// delete single rule
router.delete('/:id', auth.required, (req, res) => {
  Rule.findByIdAndDelete(req.params.id, {useFindAndModify: false}, (err, deletedObject) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(deletedObject);
  });
});

// get all rules
router.get('/', auth.optional, (req, res, next) => {
  Rule.find((err, rules) => {
    if (err) console.error(err);
    res.send(rules);
  })
});

// get all rules matching query
router.get('/allWhere', auth.optional, (req, res) => {
  const query = req.body;
  
  // some amount of processing will be required, probably.
  
  Rule.find(query, (err, rules) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(rules);
  });
});

// get a rule by id
router.get('/:id', auth.optional, (req, res) => {
  Rule.findById(req.params.id, (err, rule) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(rule);
  });
});

module.exports = router;
