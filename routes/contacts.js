const { Router } = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
} = require('../controllers/contacts');

const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', createContact);
router.put('/:id', updateContact);

module.exports = router;
