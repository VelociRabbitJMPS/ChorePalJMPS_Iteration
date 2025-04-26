const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const childSchema = new Schema({
    username: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Child', childSchema);