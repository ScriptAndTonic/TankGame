const mongoose = require('mongoose');

const init = () => {
    mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/tankGame', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongo'));
}

const disconnect = async() => {
    await mongoose.disconnect();
}

module.exports.init = init;
module.exports.disconnect = disconnect;