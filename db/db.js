const mongoose = require('mongoose');

const init = () => {
    const mongoURL = process.env.MONGO_HOST || 'mongo:27017';
    console.log('Attempting to connect to mongo: ' + mongoURL);
    mongoose.connect('mongodb://' + mongoURL + '/tankGame', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongo'));
}

const disconnect = async() => {
    await mongoose.disconnect();
}

module.exports.init = init;
module.exports.disconnect = disconnect;