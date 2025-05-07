//this controller handles request and talks to MongoDB
const database = require('../config/connect');
const { ObjectId } = require('mongodb');

//handles retrieving all children req
const getAllChildren = async (req, res) => {
    //attempts to retrieve child(ren) data found in collection and store data in an array
    try {
        const db = database.getDb();
        const children = await db.collection('child').find({}).toArray();

        //if one or more children are retrieved, sends ok response with arr of children parsed in json
        if(children.length > 0) {
            res.status(200).json(children);
        //handles expected edge cases like empty db
        } else {
            res.status(400).json({ message: 'No children in database'});
        }
    //handles unexpected edge cases like disconnected db, wrong collection name, internal MongoDB error; prevents server from crashing, sends useful res, makes debugging easier
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};

/**
 * childRoutes.route('/children').get(async (req, res) => {
   let db = database.getDb();
   let data = await db.collection('child').find({}).toArray();
   if (data.length > 0) {
     res.json(data);
   } else {
     throw new Error('Data was not found :(');
   }
 });
 */

 module.exports = {
    getAllChildren,
 };