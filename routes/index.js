const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/professional', require('./professional'))
router.use('/contacts', require('./contacts'))

module.exports = router;