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
}