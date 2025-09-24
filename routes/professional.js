const { Router } = require('express');
const { professional } = require('../controllers/professional');

const router = Router();

router.get('/', professional);

module.exports = router;
