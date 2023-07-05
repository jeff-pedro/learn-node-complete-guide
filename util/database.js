const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/node-complete')
    .then(client => {
        console.log('Connected!');
        callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;
