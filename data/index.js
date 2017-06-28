/* globals module require */

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


module.exports = function(config) {
    MongoClient.connect(config.connectionString);
};

