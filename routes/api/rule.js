const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Rule = mongoose.model('Rule');

// POST new rule
router.post('/', auth.required, (req, res, next) => {
  const rules = req.body.rules;

  if (!rules) {
    return res.status(400).send({
      errors: 'Expected a top level field called "rules", containing either a single record or a list of records.'
    })
  }

  // current preferred function from mongo
  Rule.insertMany(rules)
    .catch((err) => { // returns the first error that is encountered. if there is an error, no records are written
      if(err) {
        res.json(err);
        res.status(400); // HTTP 400: Bad Request
      }
    })
    .then((rules) => {
      if (rules) { // skip this bit if there was an error
        res.json({
          saved: rules
        });
        res.status(201); // HTTP 201: Created
      }
    });

    // look ma! no return statements!
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
