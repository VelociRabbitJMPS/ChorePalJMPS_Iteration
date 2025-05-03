const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const parentSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    childrenName: [Number] //childrenName will be ObjectID of child linked to the parent in an array
});

parentSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next;
    })
})

module.exports = mongoose.model('Parent', parentSchema);

//used lecture notes from screenshot on March 22, 2025 at 1:57PM