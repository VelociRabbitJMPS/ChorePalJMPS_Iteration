const database = require('../config/connect');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_ROUNDS = 6;

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const db = database.getDb();
    const users = await db.collection('users').find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET one user
const getOneUser = async (req, res) => {
  try {
    const db = database.getDb();
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST: Register new user
const createUser = async (req, res) => {
  try {
    const db = database.getDb();
    const takenEmail = await db
      .collection('users')
      .findOne({ email: req.body.email });

    if (takenEmail) {
      return res.status(409).json({ message: 'The email is taken' });
    }

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const newUser = {
      username: req.body.name,
      email: req.body.email,
      password: hash,
      childrenName: req.body.childrenName,
    };

    const result = await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User created', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT: Update user
const updateUser = async (req, res) => {
  try {
    const db = database.getDb();

    const updateData = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        childrenName: req.body.childrenName,
      },
    };

    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(req.params.id) }, updateData);

    res.status(200).json({ message: 'User updated', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE: Delete user
const deleteUser = async (req, res) => {
  try {
    const db = database.getDb();
    const result = await db
      .collection('users')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST: Login route
const loginUser = async (req, res) => {
  try {
    const db = database.getDb();
    const user = await db
      .collection('users')
      .findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const confirmation = await bcrypt.compare(req.body.password, user.password);

    if (!confirmation) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
