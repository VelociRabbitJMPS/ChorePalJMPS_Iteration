const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

let choreRoutes = express.Router();

// #1 retrieve all
// http://localhost:3000/chores
choreRoutes.route('/chores').get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection('chores').find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #2 retrieve one
// http://localhost:3000/chores/id
choreRoutes.route('/chores/:id').get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('chores')
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #3 create one
// http://localhost:3000/chores
choreRoutes.route('/chores').post(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    choreName: req.body.chorename,
    isWeekly: req.body.isweekly,
    isCompleted: req.body.iscompleted,
    rating: req.body.rating,
    child: req.body.child,
  };
  let data = await db.collection('chores').insertOne(mongoObject);
  res.json(data);
});
// #4 update one
// http://localhost:3000/chores/id
choreRoutes.route('/chores/:id').put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      choreName: req.body.chorename,
      isWeekly: req.body.isweekly,
      isCompleted: req.body.iscompleted,
      rating: req.body.rating,
      child: req.body.child,
    },
  };
  let data = await db
    .collection('chores')
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// #5 delete one
// http://localhost:3000/chores/id
choreRoutes.route('/chores/:id').delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('chores')
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

module.exports = choreRoutes;
