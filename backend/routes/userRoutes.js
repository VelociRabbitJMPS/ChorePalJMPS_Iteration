const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

// #1 retrieve all
userRoutes.route('/users').get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection('users').find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #2 retrieve one
userRoutes.route('/users/:id').get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('users')
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});
// #3 create one
userRoutes.route('/users').post(async (req, res) => {
  console.log('stringproof');
  let db = database.getDb();

  const takenEmail = await db
    .collection('users')
    .findOne({ email: req.body.email });

  if (takenEmail) {
    res.json({ message: 'The email is taken' });
  } else {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    let mongoObject = {
      username: req.body.name,
      email: req.body.email,
      password: hash,
      childrenName: req.body.childrenName,
    };
    let data = await db.collection('users').insertOne(mongoObject);
    res.json(data);
  }
});
// #4 update one
userRoutes.route('/users/:id').put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      childrenName: req.body.childrenName,
    },
  };
  let data = await db
    .collection('users')
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// #5 delete one
userRoutes.route('/users/:id').delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection('users')
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

// #6 login route
userRoutes.route('/users/login').post(async (req, res) => {
  let db = database.getDb();

  const user = await db.collection('users').findOne({ email: req.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: '1hr' });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Incorrect Password' });
    }
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

module.exports = userRoutes;
