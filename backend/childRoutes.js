const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

let childRoutes = express.Router();

// #1 retrieve all
// http://localhost:3000/chores
childRoutes.route('/children').get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection('child').find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #2 retrieve one
// http://localhost:3000/chores/id
childRoutes.route('/children/:id').get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('child')
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #3 create one
// http://localhost:3000/chores
childRoutes.route('/children').post(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    username: req.body.username,
  };
  let data = await db.collection('child').insertOne(mongoObject);
  res.json(data);
});
// #4 update one
// http://localhost:3000/chores/id
childRoutes.route('/children/:id').put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      username: req.body.username,
    },
  };
  let data = await db
    .collection('child')
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// #5 delete one
// http://localhost:3000/chores/id
childRoutes.route('/children/:id').delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('child')
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

module.exports = childRoutes;
