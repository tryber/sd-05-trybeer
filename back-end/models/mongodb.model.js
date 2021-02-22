const { MongoClient } = require('mongodb');
require('dotenv').config();

<<<<<<< HEAD
const DB_NAME = process.env.DB_NAME || 'Trybeer';
const DB_URL = process.env.DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;
=======
const SCHEMA = process.env.SCHEMA || 'trybeer';
const DB_URL = `mongodb://${process.env.HOSTURL || 'localhost'}:27017/${SCHEMA}`;
>>>>>>> Lizzard/clear
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