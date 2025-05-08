const express = require('express');
const choreController = require('../controllers/choreController')
//updated path to match newly modularized MVC
const database = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

let choreRoutes = express.Router();

// #1 retrieve all chores
// http://localhost:3000/chores
choreRoutes.get('/', choreController.getAllChores);

// #2 retrieve one by id
// http://localhost:3000/chores/id
choreRoutes.get('/:id', choreController.getOneChore);
  
// #3 create one chore
// http://localhost:3000/chores
choreRoutes.post('/', choreController.createOneChore);
 
// #4 update a chore
// http://localhost:3000/chores/id
choreRoutes.put('/:id', choreController.updateOneController);

// #5 delete one
// http://localhost:3000/chores/id
choreRoutes.delete('/:id', choreController.deleteOneChore);

module.exports = choreRoutes;
