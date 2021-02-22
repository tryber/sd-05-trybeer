const { MongoClient } = require('mongodb');
require('dotenv').config();

const SCHEMA = process.env.SCHEMA || 'trybeer';
const DB_URL = `mongodb://${process.env.HOSTURL || 'localhost'}:27017/${SCHEMA}`;
let connection = null;

module.exports = async (collection) => {
  if (typeof collection !== 'string') return;
  try {
    connection = connection || await MongoClient.connect(
      DB_URL,
      { useUnifiedTopology: true, useNewUrlParser: true },
    );
    return await connection.db(SCHEMA).collection(collection);
  } catch (err) {
    console.error(err);
  }
};