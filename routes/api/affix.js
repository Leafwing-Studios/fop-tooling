const mongoose = require('mongoose');
const router = require('express').Router();
// const passport = require('passport');
const auth = require('../auth');
const Affix = mongoose.model('Affix');

// POST new affix
router.post('/', auth.required, (req, res, next) => {
  const affix = req.body;
  
  const finalAffix = new Affix(affix);
  return finalAffix.save()
    .catch((err) => res.json(err)) // catches validation errors from the databse, and others
    .then(() => res.json({affix: finalAffix}));
});

// update affix
router.post('/:id', auth.required, (req, res) => {
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

// delete single rule
router.delete('/:id', auth.required, (req, res) => {
  Affix.findByIdAndDelete(req.params.id, {useFindAndModify: false}, (err, deletedObject) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(deletedObject);
  });
});

// get all affixes
router.get('/', auth.optional, (req, res, next) => {
  Affix.find((err, affixes) => {
    if (err) console.error(err);
    res.send(affixes);
  })
});

// get all rules matching query
router.get('/allWhere', auth.optional, (req, res) => {
  const query = req.body;
  
  // some amount of processing will be required, probably.
  
  Affix.find(query, (err, affixes) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(affixes);
  });
});

// get a rule by id
router.get('/:id', auth.optional, (req, res) => {
  Affix.findById(req.params.id, (err, affix) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(affix);
  });
});

module.exports = router;
