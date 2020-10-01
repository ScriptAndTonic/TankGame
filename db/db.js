const mongoose = require('mongoose');
const dotenv = require('dotenv').config;

let _db;

const init = () => {
    mongoose.connect('mongodb://mongo:27017/tankGameTest', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongo'));
}

const disconnect = async() => {
    await mongoose.disconnect();
}

module.exports.init = init;
module.exports.disconnect = disconnect;