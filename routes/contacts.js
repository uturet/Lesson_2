const { Router } = require('express');
const { getContacts, getContact } = require('../controllers/contacts');

const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);

module.exports = router;
