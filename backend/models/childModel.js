const mongoose = require('mongoose');
//invokes Schema constructor to determine 
const Schema = mongoose.Schema;

//initializes salt work factor; is 10 sufficient to run algo as slowly as possible without affecting UX?
//defined but not yet used - actually is being used in userRoutes.js
const SALT_WORK_FACTOR = 10;

//imports bcrypt library from nodeJS to integrate salting + hashing 
//defined but not yet used
const bcrypt = require('bcryptjs');

//WILL THIS BE CALLED 'CHILDS' OR 'CHILDREN'? LOL
const childSchema = new Schema({
    username: {type: String, required: true, unique: true}
    //ADD PASSWORD PROPERTY HERE - hold off on this for now
});

module.exports = mongoose.model('Child', childSchema);


//References:
//https://auth0.com/blog/hashing-in-action-understanding-bcrypt/