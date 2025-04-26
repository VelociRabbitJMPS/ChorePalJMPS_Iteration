const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choreSchema = new Schema({
    choreName: {type: String},
    isWeekly: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    rating: {type: Number},
    childName: {type: String},
    image: {type: String},
    day: {type: String}
});

module.exports = mongoose.model('Chore', choreSchema);