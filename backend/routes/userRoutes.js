const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// #1 GET route to retrieve all users from db at /users
router.get('/', userController.getAllUsers);

// #2 GET route to retrieve on user from db at /users/:id
router.get('/:id', userController.getOneUser);

// #3 POST route to create/register new user and add to db at /users
router.post('/', userController.createUser);

// #4 PUT route to update existing user's data in db by id at /users/:id
router.put('/:id', userController.updateUser);

// #5 route to authenticate user by id and return JS web token (JWT) at /users/:id
router.post('/login', userController.loginUser);

// #6 route to delete existing user found in db by id at /users/:id
router.delete('/:id', userController.deleteUser);


module.exports = router;