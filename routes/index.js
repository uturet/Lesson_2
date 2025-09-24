const express = require('express');
const router = express.Router();

router.use('/professional', require('./professional'))

module.exports = router;