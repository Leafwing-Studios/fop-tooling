const express = require('express');
const router = express.Router();

router.use('/rule', require('./rule'));

module.exports = router;
