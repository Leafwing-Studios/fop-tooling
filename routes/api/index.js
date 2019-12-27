const express = require('express');
const router = express.Router();

router.use('/rule', require('./rule'));
router.use('/affix', require('./affix'));
router.use('/user', require('./user'));

module.exports = router;
