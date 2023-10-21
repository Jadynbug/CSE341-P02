require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    throw new dbAlreadyInit('Db is already initialized!');
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  //console.log("in getDb");
  if (!_db) {
    //console.log("no Db");
    throw dbNotInit('Db not initialized');
  }
  //console.log("yes db");
  return _db;
};


module.exports = {
  initDb,
  getDb,
};