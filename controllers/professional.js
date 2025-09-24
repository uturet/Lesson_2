const { ObjectId } = require('mongodb');
const mongodb = require('../db');

exports.professional = async (req, res) => {
  const result = await mongodb.getDb().collection('professional').findOne();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};
