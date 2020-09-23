const mongoose = require('mongoose');
const dotenv = require('dotenv').config;

let _db;

function init() {
    mongoose.connect('mongodb://localhost:27017/tankGameTest', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongo'));
}

module.exports = {
    init
}