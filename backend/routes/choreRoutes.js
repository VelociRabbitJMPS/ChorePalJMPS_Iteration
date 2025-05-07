const express = require('express');
//updated path to match newly modularized MVC
const database = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

let choreRoutes = express.Router();

// #1 retrieve all
// http://localhost:3000/chores
choreRoutes.route('/chores').get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection('chores').find({}).toArray();
  data = data.map((chore) => ({
    ...chore,
    status: chore.isCompleted ? 'Completed' : 'Pending',
  }));
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
    choreName: req.body.choreName,
    isWeekly: req.body.isWeekly,
    isCompleted: req.body.isCompleted,
    rating: req.body.rating,
    childName: req.body.childName,
    image: req.body.image,
    day: req.body.day,
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
      choreName: req.body.choreName,
      isWeekly: req.body.isWeekly,
      isCompleted: req.body.isCompleted,
      rating: req.body.rating,
      childName: req.body.childName,
      image: req.body.image,
      day: req.body.day,
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
