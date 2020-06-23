const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const middleware = require('../middleware'); // custom middleware functions
const Affix = mongoose.model('Affix');

// use middleware.isAdmin for routes that only admins should be able to access, like affix updating, creation, and deletion. 

// POST new affix(es)
// Expects a top level "affixes" field in the body, which is a list of affixes. See ../../models/affix.js for which fields are expected.
router.post('/', middleware.isAdmin, function (req, res) {
    const affixes = req.body.affixes;

    if (!affixes) {
      return res.status(400).send({
        errors: 'Expected a top level field called "affixes", containing either a single record or a list of records.'
      })
    }

    // current preferred function from mongo
    Affix.insertMany(affixes)
      .catch((err) => { // returns the first error that is encountered. if there is an error, no records are written
        if(err) {
          res.json(err);
          res.status(400); // HTTP 400: Bad Request
        }
      })
      .then((affixes) => {
        if (affixes) { // skip this bit if there was an error
          res.json({
            saved: affixes
          });
          res.status(201); // HTTP 201: Created
        }
      });

      // look ma! no return statements!
});

// get affixes matching a filter provided
// this is a post route in name only- this basically just gets affixes based on queryies present in the body of the request
router.post('/allWhere', (req, res) => {
  const { query } = req.body;
  const formattedQuery = { // this is the type of thing that feels like it shouldn't work
    ...(query.slot && {slot: query.slot}),
    ...(query.affixTypes && {affixType: { $in: query.affixTypes}}),
  };

  Affix.find(formattedQuery, (err, affixes) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(affixes);
  });
});

// update affix
router.post('/:id', middleware.isAdmin, (req, res) => {
  const affix = req.body;
  const options = {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  };

  Affix.findByIdAndUpdate(req.params.id, affix, options, (err, affix) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(affix);
  });
});

// delete single affix
router.delete('/:id', middleware.isAdmin, (req, res) => {
  Affix.findByIdAndDelete(req.params.id, {useFindAndModify: false}, (err, deletedObject) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(deletedObject);
  });
});

// get all affixes
router.get('/', (req, res, next) => {
  Affix.find((err, affixes) => {
    if (err) console.error(err);
    res.send(affixes);
  })
});

// get a affix by id
router.get('/:id', (req, res) => {
  Affix.findById(req.params.id, (err, affix) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(affix);
  });
});

module.exports = router;
