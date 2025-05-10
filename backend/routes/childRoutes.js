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

// #1 route to retrieve all children from http://localhost:3000/children 
childRoutes.get('/', childController.getAllChildren);

// #2 route to retrieve one child from http://localhost:3000/children/:id by id
childRoutes.get('/:id', childController.getOneChild);

// #3 route to create one child and add to card at http://localhost:3000/children
childRoutes.post('/', childController.createOneChild);

// #4 route to update one child's data by id from http://localhost:3000/children/:id
childRoutes.put('/:id', childController.updateOneChild);

// #5 route to delete one child by id from http://localhost:3000/children/:id
childRoutes.delete('/:id', childController.deleteOneChild);

module.exports = childRoutes;
