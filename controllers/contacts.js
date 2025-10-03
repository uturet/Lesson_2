const { ObjectId } = require('mongodb');
const mongodb = require('../db');

exports.getContacts = async (req, res) => {
  const result = await mongodb.getDb().collection('contacts').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

exports.getContact = async (req, res) => {
  const id = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDb()
    .collection('contacts')
    .findOne({ _id: id });

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

exports.createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await mongodb.getDb().collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: birthday,
      createdAt: new Date(),
    });

    res.status(201).json({ id: String(result.insertedId) });
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact id format.' });
  }

  const contactId = ObjectId.createFromHexString(id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const updateFields = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  };

  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  if (!Object.keys(updateFields).length) {
    return res.status(400).json({ message: 'No update fields provided.' });
  }

  const result = await mongodb
    .getDb()
    .collection('contacts')
    .updateOne({ _id: contactId }, { $set: updateFields });

  if (!result.matchedCount) {
    return res.status(404).json({ message: 'Contact not found.' });
  }

  res.status(204).send();
};
