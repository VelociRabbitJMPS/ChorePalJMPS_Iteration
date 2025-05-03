const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defines structure of items in chore collection
const choreSchema = new Schema({
    choreName: {type: String},
    isWeekly: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    rating: {type: Number},
    childName: {type: String}, //WILL THE OBJECT ID BE A STR OR NUM? Num wrapped in str
    //IS STORING A URL HERE THE BEST OPTION? IS IT POSSIBLE TO STORE THE PNG OR SVG?
    image: {type: String},
    day: {type: String}
});

module.exports = mongoose.model('Chore', choreSchema);