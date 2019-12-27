const express = require('express');
const router = express.Router();

router.use('/rule', require('./rule'));
router.use('/affix', require('./affix'));

module.exports = router;
