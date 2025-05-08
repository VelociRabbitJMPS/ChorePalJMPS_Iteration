const express = require('express');
//changed file path to connect.js to match new MVC
const database = require('../config/connect.js')
//requiring newly added childController
const childController = require('../controllers/childController')
// const database = require('./connect');
//imports 12-byte Binary JSON (bson) object type
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

const childRoutes = express.Router();

// #1 retrieve all children from http://localhost:3000/children 
childRoutes.get('/children', childController.getAllChildren);

// #2 retrieve one child from http://localhost:3000/children
childRoutes.get('/children/:id', childController.getOneChild);

// #3 create one child and add to card at http://localhost:3000/
childRoutes.post('children/', childController.createOneChild);

// #4 update one child's data 
childRoutes.post('/children', childController.updateOneChild)
// childRoutes.route('/children').post(async (req, res) => {
//   let db = database.getDb();
//   let mongoObject = {
//     username: req.body.username,
//   };
//   let data = await db.collection('child').insertOne(mongoObject);
//   res.json(data);
// });
// // #4 update one
// // http://localhost:3000/chores/id
// childRoutes.route('/children/:id').put(async (req, res) => {
//   let db = database.getDb();
//   let mongoObject = {
//     $set: {
//       username: req.body.username,
//     },
//   };
//   let data = await db
//     .collection('child')
//     .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
//   res.json(data);
// });

// // #5 delete one
// // http://localhost:3000/chores/id
// childRoutes.route('/children/:id').delete(async (req, res) => {
//   let db = database.getDb();
//   let data = await db
//     .collection('child')
//     .deleteOne({ _id: new ObjectId(req.params.id) });
//   res.json(data);
// });

module.exports = childRoutes;
