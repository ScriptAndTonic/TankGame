const mongoose = require('mongoose');

const schema = mongoose.Schema({
    tank1: String,
    tank1StartingPosition: { row: Number, column: Number },
    tank2: String,
    tank2StartingPosition: { row: Number, column: Number },
    map: String,
    status: String,
    score: { tank1: Number, tank2: Number }
}, { timestamps: true });

module.exports = mongoose.model('Session', schema);