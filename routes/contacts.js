const { Router } = require('express');
const { getContacts, getContact, createContact } = require('../controllers/contacts');

const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', createContact)

module.exports = router;
