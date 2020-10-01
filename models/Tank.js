const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    maxHealth: Number,
    damage: Number,
    range: Number,
    speed: Number
});

module.exports = mongoose.model('Tank', schema);