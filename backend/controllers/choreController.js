// backend/controllers/choreController.js
const database = require('../config/connect');
const { ObjectId } = require('mongodb');

// GET: Retrieve all chores
const getAllChores = async (req, res) => {
  try {
    const db = database.getDb();
    let chores = await db.collection('chores').find({}).toArray();

    chores = chores.map((chore) => ({
      ...chore,
      status: chore.isCompleted ? 'Completed' : 'Pending',
    }));

    res.status(200).json(chores);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET: Retrieve one chore
const getOneChore = async (req, res) => {
  try {
    const db = database.getDb();
    const chore = await db
      .collection('chores')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (chore) {
      res.status(200).json(chore);
    } else {
      res.status(404).json({ message: 'Chore not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST: Create one chore
const createOneChore = async (req, res) => {
  try {
    const db = database.getDb();
    const newChore = {
      choreName: req.body.choreName,
      isWeekly: req.body.isWeekly,
      isCompleted: req.body.isCompleted,
      rating: req.body.rating,
      childName: req.body.childName,
      image: req.body.image,
      day: req.body.day,
    };

    const result = await db.collection('chores').insertOne(newChore);
    res.status(201).json({ message: 'Chore created', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT: Update one chore
const updateOneChore = async (req, res) => {
  try {
    const db = database.getDb();
    const updateData = {
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

    const result = await db
      .collection('chores')
      .updateOne({ _id: new ObjectId(req.params.id) }, updateData);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Chore not found' });
    } else {
      res.status(200).json({ message: 'Chore updated', result });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE: Delete one chore
const deleteOneChore = async (req, res) => {
  try {
    const db = database.getDb();
    const result = await db
      .collection('chores')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Chore deleted' });
    } else {
      res.status(404).json({ message: 'Chore not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllChores,
  getOneChore,
  createOneChore,
  updateOneChore,
  deleteOneChore,
};
