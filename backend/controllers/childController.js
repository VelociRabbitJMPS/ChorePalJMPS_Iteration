//this controller handles request and talks to MongoDB
const database = require('../config/connect');
const { ObjectId } = require('mongodb');

// #1 GET handles req to retrieve all children
const getAllChildren = async (req, res) => {
    //attempts to retrieve child(ren) data found in collection and store data in an array
    try {
        const db = database.getDb();
        const children = await db
            .collection('child')
            .find({})
            .toArray();

        //if one or more children are retrieved, sends ok response with arr of children parsed in json
        if(children.length > 0) {
            res.status(200).json(children);
        //handles expected edge cases like empty db
        } else {
            res.status(400).json({ message: 'No children in database'});
        }
    //handle unexpected edge cases like disconnected db, wrong collection name, internal MongoDB error; prevents server from crashing, sends useful res, makes debugging easier
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};

// #2 GET handles request to retrieve one child by ID
const getOneChild = async (req, res) => {
    try {
        const db = database.getDb();
        const child = await db
            .collection('child')
            .find({ _id: new ObjectId(req.params.id) });

        //if one or more children are retrieved, sends ok response with arr of children parsed in json
        if(child) {
            res.status(200).json(child);
        //handles expected edge cases like empty db
        } else {
            res.status(404).json({ message: 'Child not found' });
        }
    //handles unexpected edge cases like disconnected db, wrong collection name, internal MongoDB error; prevents server from crashing, sends useful res, makes debugging easier
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
}

// #3 POST handles request to create new child
const createOneChild = async (req, res) => {
    try {
        const db = database.getDb();
        const newChild = {
            username: req.body.username,
        };
        const data = await db.collection('child').insertOne(newChild);
        res.status(201).json({ message: 'Child created', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// #4 PUT handles updating child data by ID
const updateOneChild = async (req, res) => {
    const id = req.params.id;
  
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
  
    try {
      const db = database.getDb();
      const updatedData = {
        $set: {
          username: req.body.username,
        },
      };
  
      const result = await db
        .collection('child')
        .updateOne({ _id: new ObjectId(id) }, updatedData);
  
      if (result.matchedCount === 0) {
        res.status(404).json({ message: 'Child not found' });
      } else {
        res.status(200).json({ message: 'Child updated', result });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
// #5 DELETE handles removing child by ID
const deleteOneChild = async (req, res) => {
    const id = req.params.id;
  
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
  
    try {
      const db = database.getDb();
      const result = await db
        .collection('child')
        .deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Child deleted' });
      } else {
        res.status(404).json({ message: 'Child not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
    
 module.exports = {
    getAllChildren,
    getOneChild,
    createOneChild,
    updateOneChild,
    deleteOneChild,
 };