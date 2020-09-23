const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    obstacles: [{ row: Number, column: Number }]
});

module.exports = mongoose.model('Map', schema);