require('express-async-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const { dbNotInit } = require('./error');

const port = 3000;

const errorHandling = (err, req, res, next) => {
  res.json({
    code: err.statusCode,
    msg: err.message,
    success: false,
  });
};

app
  .use(bodyParser.json()).use(errorHandling).use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    throw new dbNotInit(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});