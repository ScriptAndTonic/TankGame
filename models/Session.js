const mongoose = require('mongoose');

const schema = mongoose.Schema({
    tank1: String,
    tank2: String,
    map: String,
    status: String,
    winner: String,
}, { timestamps: true });

module.exports = mongoose.model('Session', schema);