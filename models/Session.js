const mongoose = require('mongoose');

const schema = mongoose.Schema({
    tank1: String,
    tank2: String,
    map: String,
    status: String,
    winner: String,
    liveInfo: {
        tank1Health: Number,
        tank2Health: Number,
        tank1Position: {
            row: Number,
            column: Number
        },
        tank2Position: {
            row: Number,
            column: Number
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', schema);